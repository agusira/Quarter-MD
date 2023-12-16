import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("tools", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["ssweb", "ss"];
    this.execute = async () => {
      let data = await Function.ssweb(m.args[0])
      return sock.sendMessage(m.chat, {image: data, caption: "jangan lupa berterimakasih!!"})
    };
  }
}
