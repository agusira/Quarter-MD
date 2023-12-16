import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function, newWASocket, store, attribute }) {
    super("premium-tools", {
      parameter: "<number>",
      description: "Add premium users to the bot database",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };

    this.command = ["addprem"];
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

      let status = false;
      Object.keys(db.config?.prems).forEach((i) => {
        if (db.config.prems[i] == user) {
          status = true;
        }
        return status;
      });
      if (!status) {
        db.config?.prems?.push(user);
        return m.reply(
          `Berhasil menambahkan ${user} ke dalam database premium`
        );
      } else if (status) {
        return m.reply("User ini sudah premium sebelumnya");
      }
      // m.savedb("config");
    };
  }
}
