import { Collection } from '../../collection.js';
import { User, Group, Config, Werewolf } from '../../index.js';

export class Execute extends Collection {
  constructor(m, sock, { db }) {
    super('branch/function', {
      function: true,
      public: true
    });
    this.editor = {
      exclusive: {
        type: 'add',
        index: 1,
      },
    };
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.branch = async () => {
      if (db.game.tebakan.hasOwnProperty(m.sender)) {
        if (m.budy.toLowerCase().replace(/ +/, '') == db.game.tebakan[m.sender].replace(/ +/, '')) {
          await m.reply("jawaban benar")
          if (!db.user[m.sender].premium) {
            db.user[m.sender].limit += parseInt(10);
            m.reply("Limit anda bertambah 10")
          }
          delete db.game.tebakan[m.sender]
        }
        else if (m.budy.toLowerCase() == ("nyerah" || "menyerah")) {
          await m.reply("jawabannya adalah " + this.capitalize(db.game.tebakan[m.sender]))
          delete db.game.tebakan[m.sender]
        }
        else {
          return m.reply("jawaban salah..")
        }
      }
      if (db.game.asahotak.hasOwnProperty(m.sender)) {
        if (m.budy.toLowerCase().replace(/ +/, '') == db.game.asahotak[m.sender].replace(/ +/, '')) {
          await m.reply("Selamat!! jawaban anda benar")
          if (!db.user[m.sender].premium) {
            db.user[m.sender].limit += parseInt(10);
            m.reply("Limit anda bertambah 10")
          }
          delete db.game.asahotak[m.sender]
        }
        else if (m.budy.toLowerCase() == "nyerah") {
          await m.reply("Anda menyerah\nJawabanya adalah " + this.capitalize(db.game.asahotak[m.sender]))
          delete db.game.asahotak[m.sender]
        }
        else {
          return m.reply("jawaban salah..")
        }
      }
    };
  };
};
