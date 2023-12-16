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
      description: 'Say hello to new members in a newly joined group',
    });
    this.options = {
      permission: 3,
      setup: {
        group: true,
      },
    };
    this.command = ['welcome'];
    this.execute = async () => {
      if (!m.args[0]) return m.reply(Function.query(m.prefix + m.command, this.helper?.parameter));
      if (m.args == 'on') {
        db.group[m.chat].welcome = true;
        return sock.sendMessage(m.chat, { text: "Mode Welcome: AKTIF" }, { quoted: m });
      } else if (m.args == 'off') {
        db.group[m.chat].welcome = false;
        return sock.sendMessage(m.chat, { text: "Mode Welcome: MATI" }, { quoted: m });
      };
    };
  };
};
