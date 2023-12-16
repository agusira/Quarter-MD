import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor (m, sock, { 
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super('owner', {
      parameter: '<query>',
      description: 'Add a number to access the Owner feature'
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['addowner']
    this.execute = async () => {
      const handler = await Function.pluginLoader('../plugins/events'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();
      if(!m.query === "@") return m.reply("Maaf perintah yang masukan salah, Harap hapus tanda @")
      if(!m.query === "08") return m.reply("Maaf perintah yang masukan salah, Gunakan 628, Bukan 08")
      if(!m.query === "@s.whatsapp.net") return m.reply("Maaf perintah yang masukan salah, Tolong jangan di tambahin '@s.whatsapp.net'")
      m.savedb('config');
      db.config.authorNumber.push(m.query);
      m.reply(Function.success('tambah', `${m.query} sebagai owner`));
    };
  };
};