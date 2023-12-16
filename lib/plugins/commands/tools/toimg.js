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
    this.command = ["toimg"];
    this.execute = async () => {
      if (!m.quoted) return;
      const media = await m.quoted.download();
      const url = await Function.webp2png(media);
      return sock.sendMessage(m.chat, { image: { url } });
    };
  }
}
