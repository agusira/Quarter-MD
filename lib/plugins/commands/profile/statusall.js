import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("owner", {
      description: "List premium users to the bot database",
    });
    this.command = ["statusall"];
    this.execute = async () => {
      return m.reply(`*ALL STATUS PREMIUM*\n\`\`\`\User      |      Status\`\`\`\n\n
${Object.entries(db.user)
  .map(([jid, v]) => [jid, v.premium])
  .filter(([v]) => v?.endsWith?.("@s.whatsapp.net"))
  .sort((a, b) => b[1] - a[1])
  .map(
    (v, i) =>
      `${i + 1}. ${sock.getName(v[0])}: ${v[1] ? "premium" : "not prem"}`
  )
  .join("\n")}`);
    };
  }
}
