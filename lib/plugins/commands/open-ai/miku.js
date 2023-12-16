import { Collection } from "../../collection.js";
import axios from "axios";
export class Execute extends Collection {
  constructor(m, sock) {
    super("open-ai", {
      description: "Berbicara dengan Miku",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["miku"];
    this.execute = async () => {
      const res = await axios.get(
        "https://api-kazedevid.vercel.app/ai/charaai?chara=Miku&text=" + m.query
      );
      m.reply(res.data);
    };
  }
}