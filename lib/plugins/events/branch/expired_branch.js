import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db }) {
    super("branch/function", {
      function: true,
      public: true,
    });
    this.editor = {
      exclusive: {
        type: "add",
        index: 1,
      },
    };
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.branch = async () => {
      if (db.user[m.sender].expired == null || !db.user[m.sender].expired) return !0;
      if (db.user[m.sender].expired != null && Date.now() > db.user[m.sender].expired) {
        m.reply("Waktu premium anda telah habis silahkan hubungi owner");
        db.user[m.sender].expired = null;
        db.config.prems.splice(
          db.config.prems.indexOf(m.sender.split("@")[0]),
          1
        );
      }
    };
  }
}
