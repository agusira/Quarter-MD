import { Collection } from "../../collection.js";
import axios from "axios";
import yts from "yt-search";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("downloader", {
      description: "Download youtube audio",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["ytmp3"];
    this.execute = async () => {
      if (!m.args[0])
        m.reply(
          "masukkan kata kunci\ncontoh: " + m.prefix + m.command + " <link yt>"
        );
      // const url = await Function.searchAndDownloadMp3(m.query)
      m.reply(Function.wait(m.sender));

      const res = await axios.get(
        "https://sleepy-cyan-shark.cyclic.app/api/ytmp3?link=" + m.args[0]
      );
      const url = res.data?.result[0].url;

      return sock.sendMessage(m.chat, { audio: { url: url } }, { quoted: m });
    };
  }
}
