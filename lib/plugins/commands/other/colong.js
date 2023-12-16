import { Collection } from "../../collection.js";
import fs from "fs";
export class Execute extends Collection {
  constructor(m, sock, {db}) {
    super("other", {
      description: "create sticker",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["colong"];
    this.execute = async () => {
      const quoted = m.quoted ? m.quoted : m;
      const mime = quoted.mtype;
      if (/sticker|image/.test(mime)) {
        let media = await quoted.download();
        let encmedia = await sock.sendImageAsSticker(m.chat, media, m, {
          packname: db.config.botName,
          author: db.config.authorName,
        });
        await fs.unlinkSync(encmedia);
      }
      if (/video/.test(mime)) {
        let media = await quoted.download();
        let encmedia = await sock.sendVideoAsSticker(m.chat, media, m, {
          packname: "Quarter-MD",
          author: "Aguss",
        });
        await fs.unlinkSync(encmedia);
      }
    };
  }
}
