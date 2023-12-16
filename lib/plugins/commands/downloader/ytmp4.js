import { Collection } from "../../collection.js";
import { youtubedl } from "@bochilteam/scraper";
export class Execute extends Collection {
  constructor(m, sock) {
    super("other", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["ytmp4"];
    this.execute = async () => {
      // if (!m.args) return;
      const kualitas = m.args[1];
      const vid = await youtubedl(m.args[0]);
      const resol = Object.keys(vid.video)
      if (!kualitas) {
        let no = 1
        let text = "Silahkan pilih resolusi\n\n"
        for (let i of resol) {
          text += `${no++}. ${i}\n`
        }
        return m.reply(text)
      }
      const hasil = await vid.video[kualitas ? kualitas : "360p"].download();
      return sock.sendMessage(m.chat, {
        video: { url: hasil },
        caption: "Nih kak",
        contextInfo: {
          externalAdReply: {
            thumbnail: new Uint32Array(Buffer.from(vid.thumbnail)),
            thumbnailUrl: vid.thumbnail,
            renderLargerThumbnail: false,
            mediaType: 1,
          },
        },
      });
    };
  }
}
