import { Collection } from '../../collection.js';
import { aksaraToLatin } from "@bochilteam/scraper";

export class Execute extends Collection {
  constructor(m, sock) {
    super("other", {
      parameter: '',
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ['tolatin']
    this.execute = async () => {
      return m.reply(aksaraToLatin(m.query))
    }
  }
}
