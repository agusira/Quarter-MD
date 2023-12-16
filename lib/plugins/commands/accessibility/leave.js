import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor(m, sock, {
    newWASocket,
    db,
    store,
    Function,
    attribute
  }) {
    super('accessibility', {
      parameter: '<on/off>',
      description: 'Say hello to members who recently left the group',
    });
    this.options = {
      permission: 3,
      setup: {
        group: true,
      },
    };
    this.command = ['leave'];
    this.execute = async () => {
      if (!m.args[0]) return m.reply(Function.query(m.prefix + m.command, this.helper?.parameter));
      if (m.args == 'on') {
        db.group[m.chat].leave = true;
        return sock.sendMessage(m.chat, { text: "Mode Leave: AKTIF" }, { quoted: m });
      } else if (m.args == 'off') {
        db.group[m.chat].leave = false;
        return sock.sendMessage(m.chat, { text: "Mode Leave: MATI" }, { quoted: m });
      };
    };
  };
};
