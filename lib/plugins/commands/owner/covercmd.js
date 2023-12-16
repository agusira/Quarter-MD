import { Collection } from "../../collection.js";
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, db, store, Function, attribute }) {
    super("owner", {
      parameter: "reply code",
      description: "Add commands to the bot database",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["covercmd"];
    this.execute = async () => {
      if (!m.args[0])
        return m.reply(
          `format salah!\n\nExample: ${
            m.prefix + m.command
          } category permission < setup > (command)\n\nContoh: ${
            m.prefix + m.command
          } other 0 < group : false > ( [ 'test' ] )`
        );
      let data = format(
        `import { Collection } from '../../collection.js';\n\nexport class Execute extends Collection {\n  constructor (m, sock, {\n    newWASocket, \n    db, \n    store, \n    Function, \n    attribute\n  }) {\n    super("${
          m.args[0]
        }", {\n      parameter: '',\n      description: "",\n    });\n    this.options = {\n      permission: ${
          m.args[1]
        },\n      setup: {\n        ${
          m.query.split(">")[0].split("<")[1]
        },\n      },\n    };\n    this.command =${
          m.query.split(")")[0].split("(")[1]
        }\n    this.execute = ${m.quoted.text}\n  }\n}`
      );
      m.reply(data);
    };
  }
}
