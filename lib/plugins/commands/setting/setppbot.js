import { Collection } from "../../collection.js";
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Jimp = require('jimp') 

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("owner", {
      parameter: "<query>",
      description: "Set pp bot anjay slebew",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["setppbot"];
    this.execute = async () => {
      const botNumber = sock.user.id;
      const quoted = m.quoted ? m.quoted : m;
      const mime = quoted.mtype || quoted.mimetype;

      if (!quoted)
        return m.reply(`*Reply/Atau Kirim foto dengan caption* .${m.command}`);
      if (!/image/.test(mime))
        return m.reply(`*Reply/Atau Kirim foto dengan caption* .${m.command}`);
      if (/webp/.test(mime))
        return m.reply(`*Reply/Atau Kirim foto dengan caption* .${m.command}`);
      var medis = await Function.downloadMedia(
        quoted.message,
        "./ppbot.jpeg"
      ); /*  await sock.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg') */
      if (m.args[0] == `/panjang`) {
        const { img } = await generateProfilePicture(medis);
        await sock.query({
          tag: "iq",
          attrs: {
            to: botNumber,
            type: "set",
            xmlns: "w:profile:picture",
          },
          content: [
            {
              tag: "picture",
              attrs: { type: "image" },
              content: img,
            },
          ],
        });
        fs.unlinkSync(medis);
        m.reply(`Success`);
      } else {
        await sock.updateProfilePicture(botNumber, { url: medis });
        fs.unlinkSync(medis);
        m.reply(`Success`);
      }

      async function generateProfilePicture(buffer) {
        const jimp_1 = await Jimp.read(buffer);
        const minz =
          jimp_1.getWidth() > jimp_1.getHeight()
            ? jimp_1.resize(720, Jimp.AUTO)
            : jimp_1.resize(Jimp.AUTO, 720);
        const jimp_2 = await Jimp.read(
          await minz.getBufferAsync(Jimp.MIME_JPEG)
        );
        return {
          img: await minz.getBufferAsync(Jimp.MIME_JPEG),
        };
      }
    };
  }
}
