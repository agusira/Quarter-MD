import { Collection } from "../../collection.js";
import {artinama} from "@bochilteam/scraper"

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("textpro", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["artinama"];
    this.execute = async () => {
      const arti = await artinama(m.query);
      m.reply(arti);
    };
  }
}
