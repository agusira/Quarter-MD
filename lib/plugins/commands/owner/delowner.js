import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, Function, newWASocket, store, attribute }) {
    super("owner", {
      parameter: "<number>",
      description: "Delete owner from database",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };

    this.command = ["delowner"];
    this.execute = async () => {
      const handler = await Function.pluginLoader('../plugins/events'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();

      if (!m.args[0])
        return m.reply(
          Function.query(m.prefix + m.command, this.helper.parameter)
        );
      if (!m.args[0] === "@")
        return m.reply("Maaf perintah yang masukan salah, Harap hapus tanda @");
      if (!m.args[0] === "08")
        return m.reply(
          "Maaf perintah yang masukan salah, Gunakan 628, Bukan 08"
        );
      if (!m.args[0] === "@s.whatsapp.net")
        return m.reply(
          "Maaf perintah yang masukan salah, Tolong jangan di tambahin '@s.whatsapp.net'"
        );

      m.savedb('config')
      db.config?.authorNumber?.splice(db.config?.authorNumber.indexOf(m.args[0]),1);
      m.reply(`Berhasil menghapus ${m.args[0]} dalam database owner`);
    };
  }
}
