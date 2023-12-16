import { Collection } from "../../collection.js";
import moment from "moment-timezone";

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, Function }) {
    super("other", {
      description: "Displaying features on bots",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["menu"];
    this.execute = async () => {
      if(m.args[0] == "case") {
        let no = 1
        let text = "List Menu Case\n\n"
        for(let i of db.config?.menucase){
          text += `(${no++}) ${m.prefix + i}\n`
        }
        text += `Ketik ${m.prefix}menu untuk melihat menu utama`
        return m.reply(`${db.config.menucase === "" || undefined ? "Menu belum di setel" : text}`)
      }
      let profile;
      try {
        profile = await sock.profilePictureUrl(m.sender, "image", 3000);
      } catch {
        profile =
          "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu";
      }
      return sock.sendMessage(
        m.chat,
        {
          text: await this.indexMenu(
            await this.mainMenu(m, sock, db, newWASocket, Function),
            m
          ),
          contextInfo: {
            mentionedJid: [
              m.sender,
              newWASocket.jidNormalizedUser(sock.user.id),
            ],
            externalAdReply: {
              title: `Dilihat: ${Function.formatMoney(
                Object.keys(db.user).length
              )} Orang\n`,
              body: "All Menu Quarter-MD",
              thumbnail: new Uint32Array(Buffer.from(profile)),
              thumbnailUrl: profile,
              renderLargerThumbnail: true,
              mediaType: 1,
            },
          },
        },
        { quoted: m }
      );
    };
  }
  waktu() {
    const waktu = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    if (waktu < "23:59:00") {
      var ucapanWaktu = "Selamat Malam 🏙️";
    }
    if (waktu < "19:00:00") {
      var ucapanWaktu = "Selamat Petang 🌆";
    }
    if (waktu < "18:00:00") {
      var ucapanWaktu = "Selamat Sore 🌇";
    }
    if (waktu < "15:00:00") {
      var ucapanWaktu = "Selamat Siang 🌤️";
    }
    if (waktu < "10:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌄";
    }
    if (waktu < "05:00:00") {
      var ucapanWaktu = "Selamat Subuh 🌆";
    }
    if (waktu < "03:00:00") {
      var ucapanWaktu = "Selamat Tengah Malam 🌃";
    }
    return ucapanWaktu;
  }
  async mainMenu(m, sock, db, newWASocket, Function) {
    let ha = db.config.symbol;
    // let text += `*Masuk:* ${Function.formatMoney(db.config.chat)} Pesan\n\n`;
    let text = `${this.waktu()}\n\n`;
    text += `*ダ INFO BOT (@${
      newWASocket.jidNormalizedUser(sock.user.id).split("@")[0]
    })*\n`;
    text += `*${ha} Bot:*  ${db.config.botName}\n`;
    text += `*${ha} Device:* ${newWASocket.getDevice(sock.user.id)}\n`;
    text += `*${ha} Date:* ${new Date().toDateString()}\n`;
    text += `*${ha} Total Group:* ${Object.keys(db.group).length}\n`;
    text += `*${ha} Total Fitur:* ${Object.keys(await Function.pluginLoader("../plugins/commands")).length}\n`;
    text += `*${ha} Runtime:* ${Function.runtime(process.uptime())}\n\n`;
    text += `*ダ INFO USER (@${m.sender.split("@")[0]})*\n`;
    text += `*${ha} Premium:* ${
      db.user[m.sender].premium ? "*Yes*" : "*No*"
    }\n`;
    text += `*${ha} Limit:* ${db.user[m.sender].limit}\n`;
    text += `*${ha} Waning:* [${db.user[m.sender].warning}/5]\n`;
    text += `*${ha} Banned:* ${
      db.user[m.sender].banned ? "*Yes*" : "*Safe*"
    }\n`;
    text += `*${ha} Hit Command:* ${db.user[m.sender].hit}×\n`;
    text += `*${ha} Total Chat:* ${db.user[m.sender].chat} chat\n\n`;
    text += `*Tambahkan -i untuk menampilkan informasi pada command, Contoh ${m.prefix}${m.command} -i*\n\n${readMore}`;
    return text;
  }
}
