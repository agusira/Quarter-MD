import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor ({ m, sock, attribute }) {
    super('group', {
      parameter: '<reply/mentions>',
      description: 'to reset the link group ',
    });
    this.options = {
      permission: 2,
      setup: {
        group: true,
      },
    };
    this.command = ['resetlinkgc'];
    this.execute = async () => {
      await sock.groupRevokeInvite(m.chat)
      .then(res => {
      m.reply(`Sukses Menyetel Ulang, Tautan Undangan Grup ${sock.groupMetadata.subject}`)
      }).catch((err) => m.reply(format(err)))
  };
 };
};