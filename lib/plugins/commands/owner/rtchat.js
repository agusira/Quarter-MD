import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      description: 'Reset total chat in the WhatsApp bot config',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['rtchat'];
    this.execute = async () => {
      m.reply(Function.mess?.['wait'](m.sender));
      db.config.chat = 0
      await m.reply(`View chat (Pesan) Notifikasi pesan masuk berhasil di reset!`)
    };
  };
};