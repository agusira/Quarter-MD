import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock) {
    super("owner", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["shutdown"];
    this.execute = async () => {
      await m.reply("Sukses mematikan bot...");
      process.exit(1);
    };
  }
}
