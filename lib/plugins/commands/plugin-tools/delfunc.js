import { Collection } from '../../collection.js';
import { exec } from 'child_process';

export class Execute extends Collection {
  constructor (m, sock) {
    super('owner', {
      parameter: '<folder/file>',
      description: 'Delete function command to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['delfunc'];
    this.execute = async () => {
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, '<folder/file>'));
      let file = `lib/plugins/events/${m.args[0]}`;
      return exec(`rm ${file}`, () => {
        void sock.sendMessage(m.chat, { text: `Function command ${m.query} telah di hapus!` }, { quoted: m });
      });
    };
  };
};