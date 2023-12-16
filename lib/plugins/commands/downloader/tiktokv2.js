import { Collection } from "../../collection.js";
import { tiktokdl } from "@bochilteam/scraper";
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
    this.command = ["tiktokv2"];
    this.execute = async () => {
      if (!m.args[0]) return m.reply("Masukkan linknya");
      const vid = await tiktokdl(m.args[0])
      const link = vid.video.no_watermark
      return sock.sendMessage(m.chat, {video:{url: link}})
    };
  }
}
