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
    this.command = ["readmore"];
    this.execute = async () => {
      if (!m.query)
        return m.reply(
          "format salah..\ncontoh: " + m.prefix + m.command + " Agus|Lapar buk"
        );
      const query = m.query.split("|");
      const more = String.fromCharCode(8206);
      const readMore = more.repeat(4001);
      m.reply(`${query[0]} ${readMore}${query[1]}`);
    };
  }
}
