import { Collection } from '../../collection.js';
import { unlinkSync } from 'fs';

export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super('owner', {
      parameter: '<reply: folder/file>',
      description: 'Remove file to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['rm'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, this.helper.parameter))
      try {
        await unlinkSync(`./${m.args[0]}`);
	    await sock.sendMessage(m.chat, { text: "Successfully delete file " + m.query }, { quoted: m })
	  } catch {
	    m.reply(Function?.['error']('sistem', `File ${m.args[0]} tidak di temukan.`))
	  };
    };
  };
};