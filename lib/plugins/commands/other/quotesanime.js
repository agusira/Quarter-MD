import { Collection } from "../../collection.js";
import fs from "fs";
export class Execute extends Collection {
  constructor(m, sock, { Function, newWASocket }) {
    super("other", {
      description: "Quotes Anime",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["quotesanime"];
    this.execute = async () => {
      const data = await Function.quotesAnime();
      const hasil = Function.pickRandom(data)

      sock.sendMessage(m.chat, {
        text: `\`\`\`${hasil.quotes}\`\`\`\n\n*${hasil.karakter}* _(${hasil.anime})_\n`,
        contextInfo: {
          isForwarded: true,
          mentionedJid: [m.sender, newWASocket.jidNormalizedUser(sock.user.id)],
          externalAdReply: {
            title: "Q U O T E S",
            body: "A N I M E",
            thumbnail: new Uint32Array(
              Buffer.from(fs.readFileSync("./image.jpg"))
            ),
            thumbnailUrl: '',
            sourceUrl: hasil.link,
            renderLargerThumbnail: false,
            mediaType: 1,
          },
        },
      });
    };
  }
}
