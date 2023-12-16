import { Collection } from "../../collection.js";
import fs from "fs";
export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("owner", {
      description: "reset limit to all user",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["resetlimit"];
    this.execute = async () => {
      // if (!m.args[0]) return m.reply("Berapa jumlahnya?");
      // let user = m.quoted ? m.quoted.participant : m.mentions[0];
      // if (!user) return m.reply("reply pengguna yg mau ditambah limitnya");
      // if (db.user[user].premium) return m.reply("Dia user premium");
      const handler = await Function.pluginLoader("../plugins/events");
      const properties = {
        newWASocket,
        db,
        store,
        Function,
        attribute,
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();
      let limitValue = Number(100);
      for (let usr in db.user) {
        if(db.user[usr].premium) continue
        if(!db.user[usr].premium) db.user[usr].limit = parseInt(limitValue);
      }
      m.reply("Limit berhasil diperbarui")
      m.savedb("user");
    };
  }
}
