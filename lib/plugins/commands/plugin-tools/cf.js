import { Collection } from '../../collection.js';
import { exec } from 'child_process';
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock) {
    super('owner', {
      parameter: '<query>',
      description: 'Read the contents of the file and send',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['cf'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<query>'));
      return exec(`cat ${m.args[0]}`, async (stderr, stdout) => {
        if(stderr) {
          console.error(stderr);
          return sock.sendMessage(m.chat, { text: `Gagal mengirim content file ${m.args[0]}` }, { quoted: m });
        } else {
          await sock.sendMessage(m.chat, { text: format(stdout) }, { quoted: m });
          await sock.sendMessage(m.chat, { text: `content file ${m.args[0]} berhasil di kirim!` }, { quoted: m }); 
        };
      });
    };
  };
};