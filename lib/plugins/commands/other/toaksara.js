import { Collection } from '../../collection.js';
import { latinToAksara } from "@bochilteam/scraper";
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
    this.command = ['toaksara']
    this.execute = async () => {
      return m.reply(latinToAksara(m.query))
    }
  }
}
