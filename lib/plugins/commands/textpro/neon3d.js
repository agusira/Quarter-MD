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
    this.command = ["neon3d"];
    this.execute = async () => {
      let data = await Function.textpro(
        "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
        [m.query]
      );
      return sock.sendMessage(m.chat, { image: data, caption: "Done." }, { quoted: m });
    };
  }
}