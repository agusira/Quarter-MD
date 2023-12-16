import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, {
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super("other", {
      parameter: '',
      description: "",
    });
    this.options = {
      permission: 1,
      setup: {
         group :false ,
      },
    };
    this.command = ["addstickcmd"] 
    this.execute = async () => {
      if(!m.quoted) return m.reply(`Reply Pesan!`)
      if(!m.quoted.fileSha256) return m.reply(`SHA256 Hash Missing`)
      if(!m.query) return m.reply(`Text nya mana?`)
      let hash = m.quoted.fileSha256.toString('base64')
      const handler = await Function.pluginLoader('../plugins/events'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch(); 
      m.savedb('config')
      if(db.config.sticker[hash] && db.config.sticker[hash].locked) return m.reply(`Anda Tidak Memiliki Izin Untuk Mengubah Perintah Stiker Ini`)
      db.config.sticker[hash] = {
        text,
        mentionedJid: m.mentions,
        creator: m.sender,
        at: + new Date,
        locked: false,
      }
      m.reply(`Done!`)            
    }
  }
}
