import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("plugin-tools", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["addrespon", "addres"];
    this.execute = async () => {
      const [pesan, res] = m.query.split("|");
      if (!(pesan || res)) m.reply("format salah");
      const handler = await Function.pluginLoader("../plugins/events");
      const properties = {
        newWASocket,
        db,
        store,
        Function,
        attribute,
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();
      let status = null;
      Object.keys(db.config.respon).forEach((i) => {
        if (db.config.respon[i].pesan == pesan) {
          status = i;
        }
        return status;
      });
      m.savedb("config");
      if (status != null) {
        db.config.respon[status].res = res
        return m.reply(`Sukses update respon ${pesan} kedalam database bot`);
      } else {
        db.config.respon.push({ pesan: pesan.toLowerCase(), res: res.toLowerCase() });
        return m.reply(`Sukses menambahkan respon ${pesan} kedalam database bot`);
      }
    };
  }
}
