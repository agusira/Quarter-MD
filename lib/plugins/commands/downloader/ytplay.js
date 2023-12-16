import { Collection } from "../../collection.js";
import axios from "axios";
import yts from "yt-search";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("downloader", {
      description: "Download video tiktok",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["ytplay"];
    this.execute = async () => {
      if (!m.query)
        m.reply(
          "masukkan kata kunci\ncontoh: " + m.prefix + m.command + " al hijratu"
        );
      // const url = await Function.searchAndDownloadMp3(m.query)
      m.reply(Function.wait(m.sender));
      const data = await yts(m.query);
      const link = data.all[0].url;
      const res = await axios.get(
        "https://sleepy-cyan-shark.cyclic.app/api/ytmp3?link=" + link
      );
      const url = res.data?.result[0].url;

      return sock.sendMessage(m.chat, { audio: { url: url } }, { quoted: m });
    };
  }
}
