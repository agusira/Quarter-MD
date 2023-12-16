import { Collection } from '../../collection.js';
import { exec } from 'child_process';
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock) {
    super('owner', {
      parameter: '<query>',
      description: "Read the contents of the file in the command",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['sendcmd'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<query>'));
      const folderName = m.args[0];
      const folderPath = `lib/plugins/commands/${folderName}`;
      return exec(`cat ${folderPath}`, async (stderr, stdout) => {
        if(stderr) {
          console.error(stderr);
          return sock.sendMessage(m.chat, { text: `Gagal mengirim command ${folderName}` }, { quoted: m });
        } else {
          await sock.sendMessage(m.chat, { text: format(stdout) }, { quoted: m });
          await sock.sendMessage(m.chat, { text: `Command ${folderName} berhasil di kirim!` }, { quoted: m }); 
        };
      });
    };
  };
};