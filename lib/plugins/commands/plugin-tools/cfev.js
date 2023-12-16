import { Collection } from '../../collection.js';
import { exec } from 'child_process';

export class Execute extends Collection {
  constructor(m, sock) {
    super('owner', {
      parameter: '<query>',
      description: 'create a new folder into the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['cfev'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<query>'))
      const folderName = m.args[0];
      const folderPath = `lib/plugins/events/${folderName}`;
      return exec(`mkdir -p ${folderPath}`, async (stderr, stdout) => {
        if(stderr) {
          console.error(stderr);
          return sock.sendMessage(m.chat, { text: `Gagal membuat folder ${folderName}` }, { quoted: m });
        } else {
          return sock.sendMessage(m.chat, { text: `Folder ${folderName} telah di buat!` }, { quoted: m }); 
        };
      });
    };
  };
};