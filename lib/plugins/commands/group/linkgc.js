import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { attribute }) {
    super('owner', {
      description: 'to check the group link',
    });
    this.options = {
      permission: 3,
      setup: {
        group: true,
      },
    };
    this.command = ['linkgc'];
    this.execute = async () => {
      let linkgc = `di group`
      if(!attribute.isBotAdmin) return m.reply("Bot bukan admin jadikan admin terlebih dahulu")
      linkgc = await sock.groupInviteCode(m.chat)
      m.reply('https://chat.whatsapp.com/'+linkgc)
  };
 };
};
