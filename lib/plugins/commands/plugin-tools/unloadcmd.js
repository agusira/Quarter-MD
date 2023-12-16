import { Collection } from "../../collection.js";
import { format } from "util";

export class Execute extends Collection {
  constructor(m, sock,{newWASocket, attribute, Function, db, store}) {
    super("owner", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["unloadcmd"];
    this.execute = async () => {
      const handler = await Function.pluginLoader('../plugins/commands'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
        };
        let hasil = new handler[m.args[0]].Execute(m, sock, properties)[m.args[1]]+''
        m.reply(format(hasil))
        }
  }
}
