import { Collection } from "../../collection.js";
import axios from "axios";
export class Execute extends Collection {
  constructor(m, sock) {
    super("open-ai", {
      description: "Komunikasi dengan AI",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["ai"];
    this.execute = async () => {
      const res = await axios.get(
        `https://api.yanzbotz.my.id/api/ai/gpt3?query=${m.query}`
      );
      m.reply(res.data?.result);
    };
  }
}
