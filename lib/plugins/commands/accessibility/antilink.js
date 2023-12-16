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

    this.command = ["antilink"];
    this.execute = async () => {
      if (!m.args[0])
        return m.reply(
          "*LIST ANTILINK*\n\n1. group\n2. tiktok\n3. youtube\n\nContoh: " +
          m.prefix +
          m.command +
          " group on"
        );
      if (!m.args[1]) return m.reply(`mau di <on/off> in?`);
      switch (m.args[0]) {
        case "group":
          if (m.args[1] == "on") {
            db.group[m.chat].antilinkgroup = true;
            m.reply(
              `Anti link group aktif di ${attribute.groupMetadata.subject}`
            );
          }
          if (m.args[1] == "off") {
            db.group[m.chat].antilinkgroup = false;
            m.reply("Anti link group mati");
          }
          break;
        case "tiktok":
          if (m.args[1] == "on") {
            db.group[m.chat].antilinktiktok = true;
            m.reply(
              `Anti link group aktif di ${attribute.groupMetadata.subject}`
            );
          }
          if (m.args[1] == "off") {
            db.group[m.chat].antilinktiktok = false;
            m.reply("Anti link group mati");
          }
          break;
        case "youtube":
          if (m.args[1] == "on") {
            db.group[m.chat].antilinkyoutube = true;
            m.reply(
              `Anti link group aktif di ${attribute.groupMetadata.subject}`
            );
          }
          if (m.args[1] == "off") {
            db.group[m.chat].antilinkyoutube = false;
            m.reply("Anti link group mati");
          }
          break;
        default:
          if (!m.args[1]) return "mau di on/off in?";
          break;
      }
    };
  }
}
