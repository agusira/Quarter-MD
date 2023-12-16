import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock) {
    super('owner', {
      description: 'for restartting bot',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['restart'];
    this.execute = async () => {
      return sock.sendMessage(m.chat, { text: "Bot berhasil di restart!" }, { quoted: m }).then(async () => {
        return process.send("reset")
      });
    };
  };
};