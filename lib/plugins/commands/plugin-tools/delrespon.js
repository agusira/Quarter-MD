import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("tools", {
      parameter: "",
      description: "",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["delrespon", "delres"];
    this.execute = async () => {
      // const [pesan, res] = m.query.split("|");
      if(!m.query) m.reply("format salah")
      const handler = await Function.pluginLoader("../plugins/events");
      const properties = {
        newWASocket,
        db,
        store,
        Function,
        attribute,
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();

      let position = false
      Object.keys(db.config.respon).forEach((i)=>{
        if(db.config.respon[i].pesan == m.query){
          position = i
        }
        return position
      })
      if(position != false){
        db.config.respon.splice(position, 1);
        m.reply(`Sukses menghapus respon ${m.query} dalam database bot`)
      } else {
        return m.reply("respon tidak ditemukan")
      }

      m.savedb("config")
      // m.reply(`Sukses menambahkan respon ${pesan} kedalam database bot`)
    };
  }
}
