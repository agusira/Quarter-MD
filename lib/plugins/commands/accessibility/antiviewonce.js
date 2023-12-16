import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function, newWASocket, store, attribute }) {
    super("accessibility", {
      parameter: "<number>",
      description: "Add premium users to the bot database",
    });
    this.options = {
      permission: 2,
      setup: {
        group: true,
      },
    };

    this.command = ["antiviewonce"];
    this.execute = async () => {
      if (m.args[0] == "on") {
        db.group[m.chat].antionce = true;
        m.reply(`Anti view once aktif di *${attribute.groupMetadata.subject}*`);
      }
      if (m.args[0] == "off") {
        db.group[m.chat].antionce = false;
        m.reply("Anti view once mati");
      }
      m.savedb("group");

    };
  }
}
