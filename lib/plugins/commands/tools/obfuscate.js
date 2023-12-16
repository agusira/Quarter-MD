import { Collection } from "../../collection.js";
import { format } from "util";

let obfus;

try {
  obfus = (await import("javascript-obfuscator")).default
} catch (e) {
  console.error("Obfuscate not installed!, please install now with command: npm install javascript-obfuscator");
}

export class Execute extends Collection {
  constructor(m, sock) {
    super("plugins-tools", {
      description: "Obfuscate Encrypt Code Nodejs (JavaScript)",
    });
    this.options = {
      permission: 0,
      setup: {
        premium: true,
      },
    };
    this.command = ["obfuscate"];
    this.execute = async () => {
      try {
        const code = obfus.obfuscate(m.query || m.quoted.text);
        return m.reply(format(code.getObfuscatedCode()));
      } catch (err) {
        if(String(err).includes("404")) {
          return m.reply(format(err))
        } else {
          return m.reply(`Format salah, Reply Code Dengan Caption ${m.prefix+m.command} Atau ${m.prefix+m.command} query`)
        };
      };
    };
  }
}