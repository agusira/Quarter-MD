import PhoneNumber from 'awesome-phonenumber';
import { writeExif, writeExifImg, writeExifVid, videoToWebp, imageToWebp } from "../function/index.js";
import fs from "fs"
import FileType from "file-type";
import path from 'path'
import { db } from "../../../database/index.js"
import { getBuffer } from "../utils.js";

export class Sockets {
  constructor(m, sock, Function, store, newWASocket) {
    this.m = m;
    this.sock = sock;
    this.Function = Function;
    this.store = store;
    this.newWASocket = newWASocket;
  };
  async Socket_Utils_1() {
    this.sock.getName = (jid = '', withoutContact = false) => {
      jid = this.Function?.decodeJid(jid)
      withoutContact = this.withoutContact || withoutContact
      let v
      if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
        v = db.user[jid] || {}
        if (!(v.name || v.subject)) v = await this.sock.groupMetadata(jid) || {}
        resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
      })
      else v = jid === '0@s.whatsapp.net' ? { jid, vname: 'WhatsApp' } : this.newWASocket.areJidsSameUser(jid, this.sock.user.id) ? this.sock.user : (db.user[jid] || {})
      return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    };
    this.sock.waChatKey = (pin) => ({
      key: (c) => (pin ? (c.pin ? '1' : '0') : '')
        + (c.archive ? '0' : '1')
        + (c.conversationTimestamp ? c.conversationTimestamp.toString(16).padStart(8, '0') : '')
        + c.id, compare: (k1, k2) => {
          k2.localeCompare(k1)
        }
    });

    this.sock.getFile = async (PATH, saveToFile = false) => {
      let res, filename
      const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      const type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }
      if (data && saveToFile && !filename) (filename = path.join(__dirname, '../../../temp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
      return {
        res,
        filename,
        ...type,
        data,
        deleteFile() {
          return filename && fs.promises.unlink(filename)
        }
      }
    }

    this.sock.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
      let types = await this.sock.getFile(PATH, true)
      let { filename, size, ext, mime, data } = types
      let type = '', mimetype = mime, pathFile = filename
      if (options.asDocument) type = 'document'
      if (options.asSticker || /webp/.test(mime)) {
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: "Quarter-MD", author: "Agus", categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
      }
      else if (/image/.test(mime)) type = 'image'
      else if (/video/.test(mime)) type = 'video'
      else if (/audio/.test(mime)) type = 'audio'
      else type = 'document'
      await this.sock.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
      return fs.promises.unlink(pathFile)
    }
    this.sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
      } else {
        buffer = await imageToWebp(buff)
      }

      await this.sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
      return buffer
    }
    this.sock.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options)
      } else {
        buffer = await videoToWebp(buff)
      }

      await this.sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
      return buffer
    }

    return this.sock;
  };
};
