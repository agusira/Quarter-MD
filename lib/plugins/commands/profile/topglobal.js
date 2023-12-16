import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("other", {
      description: "top global chat ke bot terbanyak",
    });
    this.command = ["topglobal", "topchat", "topglobalchat"];
    this.execute = async () => {
      let text = "*TOP GLOBAL CHAT*\n\n";
      text += Object.entries(db.user)
        .map(([jid, v]) => [jid, v.chat])
        .filter(([v]) => v.endsWith("@s.whatsapp.net"))
        .sort((a, b) => b[1] - a[1])
        .filter((_, i) => i < 10)
        .map((v, i) => `${i + 1}. ${sock.getName(v[0])} : ${v[1]}`)
        .join("\n");
      text += "\nNote: hanya menampilkan 10 besar"
      return m.reply(text);
    };
  }
}
