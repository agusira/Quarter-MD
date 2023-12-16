import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor (m, sock) {
    super('owner', {
      parameter: '<reply/mentions>',
      description: 'Unblock Whatsapp users',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['block'];
    this.execute = async () => {
      if(!m.query === "@") return m.reply("Maaf perintah yang masukan salah, Harap hapus tanda @")
      if(!m.query === "08") return m.reply("Maaf perintah yang masukan salah, Gunakan 628, Bukan 08")
      let users = m.mentions[0] ? m.mentions[0] : m.quoted ? m.quoted.participant : m.query.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await sock.updateBlockStatus(users, "unblock").then((res) => {
        m.reply(format(res))
      }).catch((err) => {
        m.reply(format(err))
      });
    };
  };
};