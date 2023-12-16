import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("owner", {
      description: "List premium users to the bot database",
    });
    this.command = ["checkex"];
    this.execute = async () => {
      const user = m.quoted ? m.quoted.participant : m.sender;
      if(db.user[user].expired == null) return
      m.reply(Function.timers(db.user[user].expired - Date.now()));
    };
  }
}
