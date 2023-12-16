import { Collection } from '../../collection.js';
import { writeFileSync } from 'fs';

export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      parameter: '<reply: folder/file>',
      description: 'Add function to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['addfunc'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<code>'));
      if(m.quoted) {
        await writeFileSync(`./lib/plugins/events/${m.args[0]}`, m.quoted.text);
	    await sock.sendMessage(m.chat, { text: "Succsess add function " + m.query }, { quoted: m })
	  } else {
	    await sock.sendMessage(m.chat, { text: "Hanya bisa berupa text, Reply text kamu!" }, { quoted: m })
      };
    };
  };
};