import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function, newWASocket, store, attribute }) {
    super("premium-tools", {
      parameter: "<number>",
      description: "Delete a premium users to the bot database",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };

    this.command = ["delprem"];
    this.execute = async () => {
      const user = m.quoted ? m.quoted.participant.split("@")[0] : m.args[0];

      // const handler = await Function.pluginLoader("../plugins/events");
      // const properties = {
      //   newWASocket,
      //   db,
      //   store,
      //   Function,
      //   attribute,
      // };
      // new handler.simpledb_branch.Execute(m, sock, properties).branch();

      if (!user)
        return m.reply(
          Function.query(m.prefix + m.command, this.helper.parameter)
        );

      db.config?.prems?.splice(db.config.prems.indexOf(user), 1);
      m.reply(`Berhasil menghapus ${user} dalam database premium`);
    };
  }
}
