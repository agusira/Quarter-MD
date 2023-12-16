import { Collection } from '../../collection.js';
import { writeFileSync } from 'fs';

export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      parameter: '<reply: folder/file>',
      description: 'Update file to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['sf'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<reply: folder/file>'))
      if(m.quoted) {
        await writeFileSync(`./${m.args[0]}`, m.quoted.text);
	    await sock.sendMessage(m.chat, { text: "Successfully add or update files " + m.query }, { quoted: m })
	  } else {
	    await sock.sendMessage(m.chat, { text: "Hanya bisa berupa text, Reply text kamu!" }, { quoted: m })
      };
    };
  };
};