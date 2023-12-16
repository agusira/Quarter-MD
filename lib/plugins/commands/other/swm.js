import { Collection } from "../../collection.js";
import fs from "fs";
import { format } from "util";
export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("other", {
      description: "create sticker",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["swm"];
    this.execute = async () => {
      const quoted = m.quoted ? m.quoted : m;
      const mime = quoted.mtype;
      const pcknm = m.query.split("|")[0];
      const atnm = m.query.split("|")[1];
      if (!/sticker|image/.test(mime))
        throw `*reply sticker with caption* *${m.prefix + m.command}*`;
      if (/sticker|image/.test(mime)) {
        let media = await m.quoted.download();
        try {
          let encmedia = await sock.sendImageAsSticker(m.chat, media, m, {
            packname: pcknm,
            author: atnm,
          });
          fs.unlinkSync(encmedia);
        } catch (err) {
          m.reply(format(err));
        }
      }
    };
  }
}
