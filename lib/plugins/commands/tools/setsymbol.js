import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("tools", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["setsymbol"];
    this.execute = async () => {
      if (!m.args) return;
      const handler = await Function.pluginLoader("../plugins/events");
      const properties = {
        newWASocket,
        db,
        store,
        Function,
        attribute,
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();

      m.savedb("config");
      db.config.symbol = m.args;
      return m.reply("Sukses merubah symbol menjadi " + m.args);
    };
  }
}
