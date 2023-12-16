import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor (m, sock, { attribute }) {
    super('group', {
      parameter: '<reply/mentions>',
      description: 'to promote group members'
    });
    this.options = {
      permission: 2,
      setup: {
        group: true,
      },
    };
    this.command = ['promote'];
    this.execute = async () => {
      let users = m.mentions ? m.mentions[0] : m.quoted ? m.quoted.participant : m.query.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await sock.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(format(res))).catch((err) => m.reply(format(err)))
    };
  };
};