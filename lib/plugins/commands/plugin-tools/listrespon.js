import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("owner", {
      description: "List premium users to the bot database",
    });
    this.command = ["listrespon", "listres"];
    this.execute = async () => {
      let text = `*LIST RESPON*\n\n`;
      let no = 1;
      for (let obj of db.config?.respon) {
        text += `┏━❰ LIST RESPONSE (${no++}) ❱\n┃\n`;
        text += `┃ *PESAN* : ${obj.pesan}\n`;
        text += `┃ *RESPON* : ${obj.res}\n┃\n`;
        text += `┗━━━━━━━━━━━⦿\n\n`;
      }
      text += `Total: ${Object.keys(db.config?.respon).length}`;
      return m.reply(text);
    };
  }
}
