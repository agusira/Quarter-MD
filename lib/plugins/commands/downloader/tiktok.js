import { Collection } from "../../collection.js";
import axios from "axios";
export class Execute extends Collection {
  constructor(m, sock) {
    super("downloader", {
      description: "Download video tiktok",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["tiktok", "tt"];
    this.execute = async () => {
      if (!m.args[0]) return m.reply("Masukkan linknya");
      const res = await axios.get(
        "https://api.yanzbotz.my.id/api/downloader/snaptik?url=" + m.args[0]
      );
      const url = res.data.result.server1.url;
      return sock.sendMessage(m.chat, {
        video: { url: url },
        caption: res.data.result.caption,
      });
    };
  }
}
