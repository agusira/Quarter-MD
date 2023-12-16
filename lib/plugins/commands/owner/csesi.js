import { Collection } from "../../collection.js";
import fs from "fs";
import { format } from "util";
import { join } from "path";
import { exec } from "child_process";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("other", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["csesi"];
    this.execute = async () => {
      let dir = fs.readdirSync("database/session"),
        _b = 0,
        _c = dir.map(
          (v) => (_b += fs.statSync(join("database/session", v)).size)
        );
      exec(
        `rm database/session/*key* database/session/session*`,
        (stderr, stdout) => {
          if (stderr) return m.reply("Cache telah dibersihkan silahkan coba beberapa saat lagi");
          if (stdout) return m.reply(format(stdout));
          let text = `*SUKSES*\n`;
          text += `1. Cache Di Bersihkan!\n`;
          text += `2. Session Berhasil Disegarkan!\n`;
          text += `3. RAM Terpakai Sekarang ${Function.sizeString(
            process.memoryUsage().rss
          )}\n`;
          text += `4. Ukuran Session Saat Ini ${Function.sizeString(_b)}\n`;
          text += `5. Total Session ${dir.length} File\n\n`;
          let d= fs.readdirSync("database/session")
          text += `*Sisa Daftar Isi File Session Sekarang👇*\n`;
          text += `- ${d.join(`\n- `)}`;
          m.reply(text);
        }
      );
    }
  }
}
