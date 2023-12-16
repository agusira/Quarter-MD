import { Collection } from "../../collection.js";
import fs from "fs";
export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("tools", {
      description: "Upload image to TelegraPh",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["tourl"];
    this.execute = async () => {
      const quoted = m.quoted ? m.quoted : m;
      if (!/image|video/.test(quoted.mtype)) return "mana fotonya";
      if (/webp/.test(quoted.mtype)) return "mana fotonya";
      const med = await quoted.download();
      const data = await Function.TelegraPh(med);
      m.reply(data);
    };
  }
}
