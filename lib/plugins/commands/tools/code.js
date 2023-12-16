import { Collection } from "../../collection.js";
import axios from "axios";
export class Execute extends Collection {
  constructor(m, sock) {
    super("tools", {
      description: "AI code generator",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["code"];
    this.execute = async () => {
      const query = m.query.split("|");
      if (!m.query) return m.reply("Format salah");
      if (!query[0]) return m.reply("Masukkan bahasa pemrograman");
      if (!query[1]) return m.reply("Masukkan deskripsi");
      const res = await axios.get(
        `https://api.yanzbotz.my.id/api/ai/aicode?query=${query[1]}&code=${query[0]}`
      );
      m.reply(res.data?.result?.result);
    };
  }
}
