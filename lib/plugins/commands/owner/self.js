import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { db }) {
    super('owner', {
      parameter: '<on/off>',
      description: 'Bot mode makes self and public',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['self'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<on/off>'));
      if(m.args == 'on') {
        db.config.isPublic = false;
        return sock.sendMessage(m.chat, { text: "Mode bot sekarang: SELF" }, { quoted: m });
      } else if(m.args == 'off') {
        db.config.isPublic = true;
        return sock.sendMessage(m.chat, { text: "Mode bot sekarang: PUBLIC" }, { quoted: m });
      };
    };
  };
};