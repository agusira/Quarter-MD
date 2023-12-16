import fs from "fs/promises";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Collection {
  constructor(category, helper = {}) {
    this.category = category;
    this.helper = helper;
  }

  cekganteng(level) {
    let text
    if (level < 10) text = "INI MUKA ATAU SAMPAH?!"
    if (level < 21 && level >= 10) text = "Makin lama liat muka lo gw bisa muntah!"
    if (level < 31 && level > 20) text = "Keknya bakal susah dapet jodoh lu,, berdoa aja"
    if (level < 41 && level > 30) text = "Dijamin cewek susah deketin lo"
    if (level < 51 && level > 40) text = "Semoga diberkati mendapat jodoh"
    if (level < 61 && level > 50) text = "Lu Setengah Ganteng :v"
    if (level < 71 && level > 60) text = "Cukuplah"
    if (level < 81 && level > 70) text = "Lumayan Ganteng juga lu ya"
    if (level < 91 && level > 80) text = "Cewek2 pasti bakalan pingsan klo ngeliat lo!"
    if (level < 100 && level > 90) text = "AARRGGHHH!!!"
    if (level == 100) text = "LU EMANG COWOK TERGANTENG, KAYA PACARNYA ELAINA"
    return text
  }
  capitalize(text) {
    let words = text.split(" ")
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }
  async readFitur() {
    let pathdir = path.join(__dirname, "./commands");
    let fitur = readdirSync(pathdir);
    for (let fold of fitur) {
      for (let filename of readdirSync(__dirname + `/commands/${fold}`)) {
        let plugins = import(
          path.join(__dirname + `/commands/${fold}`, filename)
        );
        await plugins;
      }
    }
  }
  calculateSimilarity(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = [];

    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    const maxLen = Math.max(m, n);
    return 1 - dp[m][n] / maxLen;
  }
  async indexMenu(text, m) {
    const path = `./lib/plugins/commands/`;
    const Cmdlist = [];
    const files = await fs.readdir(path);
    const groups = {};
    for (const file of files) {
      const nestedFile = await fs.readdir(path + file);
      nestedFile.forEach((name) => {
        if (!name.endsWith(".js")) return;
        const names = name.replace(/\.js/g, "");
        Cmdlist.push({
          name: names,
          group: file,
          path: `./commands/${file}/${name}`,
        });
      });
    }
    Cmdlist.forEach((item) => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item.name);
    });
    for (const group in groups) {
      const member = groups[group].join(`\n┃➣ ` + m.prefix[0]);
      text += `┏━❰ *${group.toUpperCase()}* (${groups[group].length}) ❱\n`;
      text += `┃➣ ${m.prefix}${member}\n┗━━━━━━━━━━━⦿\n\n`;
    }
    // text += Cmdlist.length
    return text;
  }
}
