import { Collection } from '../../collection.js';


export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      parameter: '<query>',
      description: 'Set the description in the WhatsApp bot config',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['setcdesc'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<code>'));
      let before = []
      before.push(db.config.description)
      db.config.description = m.query
      return m.reply(`Berhasil memperbarui deskripsi pada config bot, Deskripsi sebelumnya "${before[0]}" Telah di ubah menjadi "${db.config.description}"`)
      before = [];
    };
  };
};