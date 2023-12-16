import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("fun", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["gantengcek", "cekganteng", "ganteng"];
    this.execute = async () => {
      const level = Function.randomize(5, 100)
      let text = `📮Ganteng Level : ${level}%\n\n`
      text += this.cekganteng(level)
      m.reply(text);
    };
  }
}
