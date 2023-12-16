import { jidDecode, downloadContentFromMessage } from "@whiskeysockets/baileys";
import fs, { promises, readFile, writeFile, readdirSync, statSync, watchFile } from "fs";
import path, { dirname, join, basename } from 'path';
import { promisify } from 'util';
import { fileURLToPath } from "url"
import { resolve } from 'import-meta-resolve';
import chalk from 'chalk';
import axios from 'axios'
import cheerio from 'cheerio'
import { spawn } from "child_process";
import yts from "yt-search"
import ytdl from "ytdl-core"
import fetch from 'node-fetch';
import * as formdata from 'formdata-node';
import file from 'file-type'
import { JSDOM } from 'jsdom'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { fromBuffer } = file

export * from './function/index.js'

export const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const TelegraPh = async (buffer) => {

  try {
    const { ext, mime } = await fromBuffer(buffer)
    let form = new formdata.FormData()
    const blob = new formdata.Blob([Buffer.from(buffer)], { type: mime })
    form.append('file', blob, 'tmp.' + ext)
    let res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form
    })
    let img = await res.json()
    if (img.error) throw img.error
    return 'https://telegra.ph' + img[0].src
  } catch (error) {
    return error
  }
}

export function randomize(a, b) {
  a = Math.ceil(a * 1)
  b = Math.ceil(b * 1)
  if (isNaN(a) || a < 0) a = 0
  if (isNaN(b) || b < 0) b = 10
  let out
  while (out === void 0 || (out < a || out > b)) out = Math.ceil(Math.random() * b)
  return out
}

export async function searchAndDownloadMp3(query) {
  const data = await yts(query)
  const link = data.all[0].url
  const video = await ytdl.getInfo(link)
  const format = video.formats
  const audio = format.filter(v => v.hasAudio)
  const url = audio[0].url
  return url
}

export async function downloadMedia(message, pathFile) {
  const type = Object.keys(message)[0];
  const mimeMap = {
    imageMessage: "image",
    videoMessage: "video",
    stickerMessage: "sticker",
    documentMessage: "document",
    audioMessage: "audio",
  };
  try {
    if (pathFile) {
      const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      await promises.writeFile(pathFile, buffer);
      return pathFile;
    } else {
      const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      };
      return buffer;
    };
  } catch (e) {
    Promise.reject(e);
  };
};
export async function pluginLoader(dir) {
  let pluginFolder = join(dirname(fileURLToPath(import.meta.url)), dir)
  let pluginFilter = filename => /\.js$/.test(filename)
  let plugins = {}
  function Scandir(dir) {
    let subdirs = readdirSync(dir)
    let files = subdirs.map((sub) => {
      let res = join(dir, sub)
      return statSync(res).isDirectory() ? Scandir(res) : res
    });
    return files.reduce((a, f) => a.concat(f), [])
  }
  for (let filelist of Scandir(pluginFolder).filter(pluginFilter)) {
    let filename = basename(filelist, '.js')
    try {
      plugins[filename] = await import(filelist)
      nocache(filelist, module => module)
    } catch (e) {
      console.log(e);
      delete plugins[filename]
    }
  }
  return plugins
}
export async function nocache(module, cb = () => { }) {
  watchFile(resolve(module, import.meta.url), async () => {
    await uncache(resolve(module, import.meta.url))
    cb(module)
  })
}
export async function uncache(module = '.') {
  return new Promise((resolve, reject) => {
    try {
      if (!!import.meta && !!import.meta.cache) {
        for (let p in import.meta.cache) {
          delete import.meta.cache[resolve(module, import.meta.url)]
        }
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
export function color(text, color) {
  return !color ? chalk.green(text) : chalk.keyword(color)(text)
};
export function bgcolor(text, bgcolor) {
  return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
};
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
export function query(command, text) {
  return `Maaf, Perintah yang anda masukkan salah, Harap kirim perintah dengan contoh seperti ini: ${command} ${text}`
};
export function input(type, command, text) {
  return `Maaf, Input pemasukan salah, Bagian ${type} belum di isi, contoh yang benar: ${command} ${text}`
};
export function wait(sender) {
  return `Halo @${sender.split("@")[0]}, Mohon tunggu sebentar yah, Permintaan anda sedang di proses!`
};
export function success(status, query) {
  return `Permintaan anda berhasil di proses!\nJenis proses '${status}', Hasil yang di ${status} adalah '${query}'`
};
export function error(type, reason) {
  return `Maaf, Terjadi kesalahan pada ${type}, Penyebab: ${reason}`
};
export function certainGroup(number, title) {
  return `Maaf, Perintah ini hanya bisa di gunakan dalam grup tertentu, Jika anda ingin masuk ke dalam grup khusus agar bisa akses fitur ini, Silahkan sewa bot terlebih dahulu, Informasi selengkapnya hubungi https://wa.me/${number} (${title})`
};
export function decodeJid(jid) {
  if (/:\d+@/gi.test(jid)) {
    const decode = jidDecode(jid) || {};
    return (
      (decode.user && decode.server && decode.user + "@" + decode.server) ||
      jid
    ).trim();
  } else {
    return jid.trim();
  };
};
export function isUrl(url) {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
};
export function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  };
};
export function sizeString(des) {
  if (des === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(des) / Math.log(1024));
  return parseFloat((des / Math.pow(1024, i)).toFixed(0)) + ' ' + sizes[i];
};
export function formatMoney(money) {
  const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd', 'U', 'D', 'Td', 'qd', 'Qd', 'sd', 'Sd', 'od', 'nd', 'V', 'Uv', 'Dv', 'Tv', 'qv', 'Qv', 'sv', 'Sv', 'ov', 'nv', 'T', 'UT', 'DT', 'TT', 'qt', 'QT', 'st', 'ST', 'ot', 'nt'];
  const suffixIndex = Math.floor(Math.log10(money) / 3);
  const suffix = suffixes[suffixIndex];
  const scaledmoney = money / Math.pow(10, suffixIndex * 3);
  return scaledmoney.toFixed(2) + suffix;
};
export function runtime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? "d, " : "d, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? "h, " : "h, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m, " : "m, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s ") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
};
export function timers(date) {
  const seconds = Math.floor((date / 1000) % 60),
    minutes = Math.floor((date / (60 * 1000)) % 60),
    hours = Math.floor((date / (60 * 60 * 1000)) % 24),
    days = Math.floor((date / (24 * 60 * 60 * 1000)));
  return `${days ? `${days} Hari ` : ''}${hours ? `${hours} Jam ` : ''}${minutes ? `${minutes} Menit ` : ''}${seconds ? `${seconds} Detik` : ''}`;
};

export function quotesAnime() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 184)
    axios.get('https://otakotaku.com/quote/feed/' + page)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const hasil = []
        $('div.kotodama-list').each(function(l, h) {
          // const link = $(h).find('a').attr('href')
          // axios.get(link).then(({data})=> console.log(data))
          hasil.push({
            link: $(h).find('a').attr('href'),
            gambar: $(h).find('img').attr('data-src'),
            karakter: $(h).find('div.char-name').text().trim(),
            anime: $(h).find('div.anime-title').text().trim(),
            episode: $(h).find('div.meta').text(),
            up_at: $(h).find('small.meta').text(),
            quotes: $(h).find('div.quote').text().trim()
          })
        })
        resolve(hasil)
      }).catch(reject)
  })
}

export async function getBuffer(url, options) {
  try {
    options ? options : {}
    const res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (err) {
    return err
  }
}

export async function webp2png(source) {
  let form = new formdata.FormData()
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  // let buffer = fromBuffer(source)
  const blob = !isUrl && new formdata.Blob([Buffer.from(source)])
  form.append('new-image-url', isUrl ? blob : '')
  form.append('new-image', isUrl ? '' : blob, 'image.webp')
  let res = await fetch('https://s6.ezgif.com/webp-to-png', {
    method: 'POST',
    body: form
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new formdata.FormData()
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
    obj[input.name] = input.value
    form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-png/' + obj.file, {
    method: 'POST',
    body: form2
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > img').src, res2.url).toString()
}

// masih error
export async function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../src', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}
// masih error
export function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}


