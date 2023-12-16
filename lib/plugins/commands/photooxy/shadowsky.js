import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("photooxy", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["shadowsky"];
    this.execute = async () => {
      if (!m.query) return m.reply("masukkan teksnya");
      let data = await Function.photooxy(
        "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
        [m.query]
      );
      return sock.sendMessage(
        m.chat,
        { image: data, caption: "Done." },
        { quoted: m }
      );
    };
  }
}
