import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("textpro", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["neon"];
    this.execute = async () => {
      let data = await Function.textpro(
        "https://textpro.me/neon-light-text-effect-online-882.html",
        [m.query]
      );
      return sock.sendMessage(m.chat, { image: data, caption: "Done." }, { quoted: m });
    };
  }
}
