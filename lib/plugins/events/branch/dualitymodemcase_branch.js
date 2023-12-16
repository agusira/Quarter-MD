import { Collection } from '../../collection.js';
import { Group } from '../../index.js';
import { format } from 'util';
import axios from 'axios';
import fs from "fs";
import { getContentType } from '@whiskeysockets/baileys';

let saveid = [];

export class Execute extends Collection {
  constructor (m, sock, {
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super('branch/function', {
      function: true,
      public: true
    });
    this.editor = {
      exclusive: {
        type: 'add',
        index: 1,
      },
      experiment: true,
    };
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.branch = async () => {
      if(this.editor.experiment) {
        try {
          switch (m.command) {
            case "menucase": {
              let no = 1
              let text = "List Menu Case\n\n"
              for(let i of db.config?.menucase){
                text += `(${no++}) ${m.prefix + i}\n`
              }
              text += `Ketik ${m.prefix}menu untuk melihat menu utama`
              return m.reply(`${db.config.menucase === "" || undefined ? "Menu belum di setel" : text}`)
            };
            break;

            case "addmenuc": {
              if(!m.args[0]) throw "text nya mana ?"
              db.config.menucase.push(m.args[0])
              m.reply("berhasil menambahkan '"+m.args[0]+"' kedalam database bot")
            }
            break

            case "ping": {
              return m.reply("pong!")
            };
            break;
            case "getid": {
              if(m.quoted) {
                try {
                  return m.reply(m.quoted.key.id)
                } catch {
                  return m.reply(Function.error('sistem', 'Database store kosong/pesan yang anda reply tidak ada, Silahkan reply pesan terbaru.'))
                }
              } else {
                return m.reply(Function.query(m.prefix+m.command, '<reply>'))
              }
            };
            break;
            case "addid": {
              if(m.args[0]) {
                try {
                  await saveid.push(m.args[0]);
                  await m.reply(Function.success('tambah', m.args[0]))
                } catch (error) {
                  m.reply(format(error))
                };
              } else {
                return m.reply(Function.query(m.prefix+m.command, '<id>'))
              };
            };
            break;
            case "delid": {
              if(m.args[0]) {
                try {
                  await saveid.pop(m.args[0]);
                  await m.reply(Function.success('hapus', m.args[0]))
                } catch (error) {
                  m.reply(format(error))
                };
              } else {
                return m.reply(Function.query(m.prefix+m.command, '<id>'))
              };
            };
            break;
            case "listid": {
              let text = '*LIST ID MESSAGE*\n\n', count = 1;
              for(let x of saveid) {
                text += `( *${count++}* ) ${x}\n`
              }
              text += `\nTotal Id Message: ${saveid.length}`
              return m.reply(text);
            }
            break;
          };
        } catch (error) {
          m.reply(format(error))
        };
      };
    };
  };
};
