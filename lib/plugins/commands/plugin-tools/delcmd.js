import { Collection } from '../../collection.js';
import { exec } from 'child_process';

export class Execute extends Collection {
  constructor (m, sock, { Function }) {
    super('owner', {
      parameter: '<folder/file>',
      description: 'Delete commands to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['delcmd'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<folder/file>'));
      let file = `lib/plugins/commands/${m.args[0]}`;
      return exec(`rm ${file}`, () => {
        void sock.sendMessage(m.chat, { text: `Command ${m.query} telah di hapus!` }, { quoted: m });
      });
    };
  };
};