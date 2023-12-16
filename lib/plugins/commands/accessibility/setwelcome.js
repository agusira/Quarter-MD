import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor(m, sock, {
    newWASocket,
    db,
    store,
    Function,
    attribute
  }) {
    super('accessibility', {
      parameter: '<query>',
      description: 'Say hello to new members in a newly joined group',
    });
    this.options = {
      permission: 3,
      setup: {
        group: true,
      },
    };
    this.command = ['setwelcome', "setwlcm"];
    this.execute = async () => {
      if (!m.query) return m.reply("masukkan teks")
      db.group[m.chat].setWelcome = m.query
    };
  };
};
