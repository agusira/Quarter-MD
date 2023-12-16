import { Collection } from "../../collection.js";
import fs from "fs";
export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("premium-tools", {
      description: "addlimit to user",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["remlimit"];
    this.execute = async () => {
      if (!m.args[0]) return m.reply("Berapa jumlahnya?");
      let user = m.quoted ? m.quoted.participant : m.mentions[0];
      if (!user) return m.reply("reply pengguna yg mau ditambah limitnya");
      if (db.user[user].premium) return m.reply("Dia user premium")
      // const handler = await Function.pluginLoader("../plugins/events");
      // const properties = {
      //   newWASocket,
      //   db,
      //   store,
      //   Function,
      //   attribute,
      // };
      // new handler.simpledb_branch.Execute(m, sock, properties).branch();
      let limitValue = Number(m.args[0])
      db.user[user].limit -= parseInt(limitValue);
      m.reply(`limit @${user.split("@")[0]} dikurangi menjadi : ${db.user[user].limit}`)
      // m.savedb("user");
    };
  }
}
