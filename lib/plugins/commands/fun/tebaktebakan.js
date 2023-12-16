import { Collection } from "../../collection.js";
import { tebaktebakan } from "@bochilteam/scraper"

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
    this.command = ["tebaktebakan", "tebakan"];
    this.execute = async () => {
      if (db.game.tebakan.hasOwnProperty(m.sender)) return m.reply("masih ada sesi yang belum diselesaikan")
      const data = await tebaktebakan()
      db.game.tebakan[m.sender] = data?.jawaban.toLowerCase();
      await m.reply("jika jawaban anda benar limitmu akan ditambah 10")
      await Function.sleep(1000)
      await m.reply(`Jawab pertanyaan berikut dalam waktu 60 detik\n\`\`\`${data?.soal}\`\`\`\n`)
      // await Function.sleep(60000)

      // this.tebaktebakan = data?.jawaban
      try {
        setTimeout(async () => {
          if (db.game.tebakan.hasOwnProperty(m.sender)) {
            await m.reply("Waktu habis\njawabannya: " + this.capitalize(db.game.tebakan[m.sender]))
            return delete db.game.tebakan[m.sender]
          }
          clearTimeout(this)
        }, 60 * 1000);

      } catch {
        await m.reply("terjadi kesalahan sesi akan di hapus")
        return delete db.game.tebakan[m.sender]
      }
      // return this

    };
  }
}
