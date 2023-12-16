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
      // let similarQuest = false
      // const max = 0
      const res = db.config.respon.find(a => a.pesan == m.body.toLowerCase())
      // db.config.respon.forEach((q) => {
      //   const similaritt = this.calculateSimilarity(q.pesan, m.body.toLowerCase())
      //   if (similaritt > max) {
      //     similarQuest = q
      //     max = similaritt
      //   }
      // })
      if (res) {
        return m.reply(res?.res)
      } //else if (similarQuest) {
      // return m.reply(similarQuest?.res)
      // }
      // for (const respon of db.config.respon) {
      //   if (respon.pesan == m.body.toLowerCase()) {
      //     m.reply(this.capitalize(respon.res))
      //   }
      // }
    };
  }
}
