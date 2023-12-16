import { Collection } from "../../collection.js";
import googleIt from "google-it";

export class Execute extends Collection {
  constructor(m, sock) {
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
    this.command = ["search"];
    this.execute = async () => {
      const hasil = await googleIt({query:m.query});
      let text = `*Title*: ${hasil[0].title}\n\n`
      text += `*Article*: ${hasil[0].snippet}\n\n`
      text += `*Sumber*: ${hasil[0].link}`
      return sock.sendMessage(m.chat, { text }, { quoted: m });
    };
  }
}
