import { Collection } from '../../collection.js';


export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      parameter: '<query>',
      description: 'Set the bot name in the WhatsApp bot config',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['setcbotname'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<query>'));
      let before = [];
      before.push(db.config.botName);
      db.config.botName = m.query;
      return m.reply(`Berhasil memperbarui nama bot, Nama bot sebelumnya "${before[0]}" Telah di ubah menjadi "${db.config.botName}"`);
      before = [];
    };
  };
};