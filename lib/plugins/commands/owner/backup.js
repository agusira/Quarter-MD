import { Collection } from "../../collection.js";
import { execSync } from "child_process";
import { readFileSync } from "fs";

export class Execute extends Collection {
  constructor(m, sock, { db, Function }) {
    super("owner", {
      description: "Backup database bot",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["backup"];
    this.execute = async () => {
      const ls = (execSync("ls"))
        .toString()
        .split("\n")
        .filter(
          (pe) =>
            pe != "node_modules" &&
            pe != "package-lock.json" &&
            pe != "baileys_store.json" &&
            pe != "test.js" &&
            pe != "jadibot" &&
            pe != "Dockerfile" &&
            pe != "temp" &&
            pe != ""
        );
      execSync(`zip -r ${db.config?.botName}.zip ${ls.join(" ")}`);

      await m.reply(Function.wait(m.sender))

      await sock
        .sendMessage(
          sock.user.id,
          {
            document: readFileSync(`./${db.config?.botName}.zip`),
            mimetype: "application/zip",
            fileName: db.config?.botName + ".zip",
          },
          { quoted: m }
        )
        .then(() => {
          void m.reply(
            `Berhasil mengekstrak *${db.config?.botName}.zip*, File backup tersebut di kirim ke private chat owner.`
          );
        })
        .catch(() => {
          void m.reply(
            `Gagal mengekstrak *${db.config?.botName}.zip*, File backup tersebut tidak di kirim`
          );
        });
      execSync(`rm -rf ${db.config?.botName}.zip`)
    };
  }
}
