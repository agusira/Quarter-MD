import { Collection } from "../../collection.js";
import { format } from "util";

export class Execute extends Collection {
  constructor(m, sock, { attribute }) {
    super("group", {
      parameter: "<reply/mentions>",
      description: "to add group members",
    });
    this.options = {
      permission: 2,
      setup: {
        group: true,
      },
    };
    this.command = ["add"];
    this.execute = async () => {
      // if (!attribute.isBotAdmin) return m.reply("Bot Bukan Admin");
      let users = m.mentions
        ? m.mentions[0]
        : m.quoted
        ? m.quoted.participant
        : m.query.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      await sock
        .groupParticipantsUpdate(m.chat, [users], "add")
        .then((res) => m.reply(format(res)))
        .catch((err) => m.reply(format(err)));
    };
  }
}
