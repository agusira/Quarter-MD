// import { TelegraPh2 } from "../structure/utils.js";
// import axios from "axios";

export class GPU {
  constructor(sock, db, id, participants, action, metadata) {
    this.sock = sock;
    this.db = db;
    this.id = id;
    this.participants = participants;
    this.action = action;
    this.metadata = metadata;
  }
  async start() {
    for (const jid of this.participants) {
      try {
        var profile = await this.sock.profilePictureUrl(jid, "image", 3000);
        // var ppurl = await TelegraPh2(profile);
      } catch {
        var profile =
          "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu";
        // var ppurl =
        // "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu";
      }
      if (this.action == "add") {
        if (this.db.group[this.id]?.welcome) {
          let text = this.db.group[this.id].setWelcome.replace(/@user/gi, `@${jid.split("@")[0]}`)
          text = text.replace(/@groupname/gi, this.metadata?.subject);
          console.log(text)
          return this.sock.sendMessage(this.id, {
            // text: `Halo @${jid.split("@")[0]}, Selamat datang dalam grup *${this.metadata.subject
            //   }*, Semoga betah yah`,
            text: text,
            contextInfo: {
              mentionedJid: [jid],
              externalAdReply: {
                title: `W E L C O M E`,
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: profile,
                sourceUrl: this.db.config?.homepage,
              },
            },
          });
        }
      }
      if (this.action == "remove") {
        if (this.db.group[this.id]?.leave) {
          return this.sock.sendMessage(this.id, {
            text: `Pengguna @${jid.split("@")[0]}, Telah keluar dari grup *${this.metadata.subject
              }*`,
            contextInfo: {
              mentionedJid: [jid],
              externalAdReply: {
                title: `L E A V E`,
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: profile,
                sourceUrl: this.db.config?.homepage,
              },
            },
          });
        }
      }
      if (this.action == "demote") {
        return this.sock.sendMessage(this.id, {
          text: `Pengguna @${jid.split("@")[0]
            }, sekarang anda bukan admin di grup *${this.metadata.subject}*`,
          contextInfo: {
            mentionedJid: [jid],
            externalAdReply: {
              title: `P R O M O T E`,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: profile,
              sourceUrl: this.db.config?.homepage,
            },
          },
        });
      }
    }
  }
}
