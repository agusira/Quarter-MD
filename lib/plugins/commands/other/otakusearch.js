import { Collection } from "../../collection.js";
// import fs from "fs";

// const more = String.fromCharCode(8206);
// const readMore = more.repeat(4001);

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("other", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["otakusearch"];
    this.execute = async () => {
      const data = await Function.otakusearch(m.query)
      return sock.sendMessage(m.chat,
        {
          image: { url: data?.img },
          caption: `Judul: ${data?.judul}\nJapanese: ${data?.japanese}\nRating: ${data?.skor}\nProduser: ${data?.produser}\nStatus: ${data?.status}\nEpisode: ${data?.episode}\nRilis: ${data?.rilis}\nStudio: ${data?.studio}\nGenre: ${data?.genre}\n`
        })
    };
  }
}
