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
    this.command = ["naruto"];
    this.execute = async () => {
      if (!m.query) return m.reply("masukkan teksnya");
      let data = await Function.photooxy(
        "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
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
