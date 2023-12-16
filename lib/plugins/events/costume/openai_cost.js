import { Collection } from "../../collection.js";
import axios from "axios";

export class Execute extends Collection {
  constructor(m, sock) {
    super("costume/function", {
      parameter: "<any>",
      description: "Chat with AI",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
      prefix: "ai",
    };
    this.special = async (query) => {
      const { data } = await axios.get("https://aemt.me/openai?text=" + query);
      m.reply(data.result);
    };
  }
}