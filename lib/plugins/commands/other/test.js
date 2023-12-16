import { Collection } from "../../collection.js";
import fs from "fs";

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

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
    this.command = ["test"];
    this.execute = async () => {
      let whatsapp = {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          ...(m.chat
            ? {
              remoteJid: "0@s.whatsapp.net",
            }
            : {}),
        },
        message: {
          extendedTextMessage: {
            text: "T E S T   B O T",
          },
        },
      };
      return sock.sendMessage(
        m.chat,
        {
          text: "Work" + readMore,
          contextInfo: {
            mentionedJid: [
              m.sender,
              // newWASocket.jidNormalizedUser(sock.user.id),
            ],
            externalAdReply: {
              title: "T E S T",
              body: "Quarter-MD Super Plugin",
              sourceUrl: "https://youtube.com",
              thumbnail: new Uint32Array(
                Buffer.from(fs.readFileSync("image.jpg"))
              ),
              thumbnailUrl: "",
              renderLargerThumbnail: false,
              mediaType: 1,
            },
          },
        },
        { quoted: whatsapp }
      );
    };
  }
}
