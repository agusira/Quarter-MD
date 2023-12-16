import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("tools", {
      parameter: "<reply>",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["readviewonce", "rvo"];
    this.execute = async () => {
      if (!m.quoted) return m.reply('reply foto/video sekali lihat')
      return sock.copyNForward(m.chat, m.quoted, true, { readViewOnce: true })
    };
  }
}
