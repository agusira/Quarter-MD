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

    this.command = ["addex"];
    this.execute = async () => {
      const user = m.quoted.participant;
      if (!m.args[0])
        return m.reply(
          Function.query(m.prefix + m.command, this.helper.parameter)
        );

      if (!user)
        return m.reply(
          Function.query(m.prefix + m.command, this.helper.parameter)
        );

      let status = false;
      Object.keys(db.config?.prems).forEach((i) => {
        if (db.config.prems[i] == user.split("@")[0]) {
          status = true;
        }
        return status;
      });
      if (!status) {
        let total = Number(m.args[0]);
        db.user[user].expired = new Date(
          Date.now() + 24 * 60 * 60 * 1000 * parseInt(total)
        ).getTime();
        db.config.prems.push(user.split("@")[0]);
        m.reply(
          `expired dalam waktu ${Function.timers(
            db.user[user].expired - Date.now()
          )}`
        );
      } else if (status) {
        return m.reply("user ini telah premium");
      }
      // m.savedb("config");
      // m.savedb("user");
    };
  }
}
