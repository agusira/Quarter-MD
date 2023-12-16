import { Collection } from "../../collection.js";
import { asahotak } from "@bochilteam/scraper"

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("textpro", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["asahotak"];
    this.execute = async () => {
      if (db.game.asahotak.hasOwnProperty(m.sender)) return m.reply("masih ada sesi yang belum diselesaikan")
      const data = await asahotak()
      db.game.asahotak[m.sender] = data?.jawaban.toLowerCase();
      await m.reply("jika jawaban anda benar limitmu akan ditambah 10")
      await Function.sleep(1000)
      await m.reply(`Jawab pertanyaan berikut dalam waktu 60 detik\n\`\`\`${data?.soal}\`\`\`\n`)

      return setTimeout(async () => {
        if (db.game.asahotak.hasOwnProperty(m.sender)) {
          await m.reply("Waktu habis\njawabannya: " + this.capitalize(db.game.asahotak[m.sender]))
          delete db.game.asahotak[m.sender]
        }
        clearTimeout(this)
      }, 60 * 1000);
      // return this

    };
  }
}
