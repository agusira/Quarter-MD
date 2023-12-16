import { Collection } from "../../collection.js";
import { format } from "util";
import { exec, execSync } from 'child_process';
import fs, { readFileSync, readdirSync } from 'fs';
import path from "path";

export class Execute extends Collection {
  constructor(m, sock, { Function, db }) {
    super("owner", {
      parameter: "<query -c path -p>",
      description: "to refresh session, cache and CPU",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ["csxc"];
    this.execute = async () => {
      let dir = fs.readdirSync('database/session'), 
      _b = 0, 
      _c = dir.map(v=> _b += (fs.statSync(path.join('database/session', v))).size);
      try {
        var isQueryCostume = m.query.includes("-c");
      } catch {
        return false;
      };
      if(isQueryCostume) {
        var scriptName = import.meta.url.split('/').filter(v => v === m.query.slice(m.query.indexOf(m.args[0], null)).split('-c')[0])[0];
      } else {
        try {
          var scriptName = import.meta.url.split('/').filter(v => v === db.config.botName)[0];
        } finally {
          if(!scriptName === undefined) return m.reply(this.Category(m, db));
        };
      };
      const thisName = '.'+import.meta.url.split('home')[1].split(scriptName)[1];
      new Promise((resolve, reject) => {
        try {
          if(!!import.meta && !!import.meta.cache) {
            for (let _ in import.meta.cache) {
              try {
                var isQueryPath = m.query.includes("-p");
              } catch {
                return false;
              };
              if(isQueryPath) {
                delete import.meta.cache[
                  resolve(
                    m.query.slice(
                      m.query.indexOf(
                        m.args[2] ? m.args[2] : 
                        m.args[0] ? m.args[0] :
                        thisName, 
                        null
                      )
                    ).split('-p')[0] ? 
                    m.query.slice(
                      m.query.indexOf(
                        m.args[2] ? m.args[2] : 
                        m.args[0] ? m.args[0] :
                        thisName, 
                        null
                      )
                    ).split('-p')[0] : thisName, 
                    import.meta.url
                  )
                ]
              } else {
                delete import.meta.cache[resolve(thisName, import.meta.url)]
              };
            };
          };
          exec(`rm database/session/*key* database/session/session*`, (stderr, stdout) => {
            if(String(stderr).includes("cannot remove")) return m.reply("Semunya sudah bersih dan di segarkan, Silahkan di coba beberapa saat lagi untuk membersihkan dan menyegarkan kembali");
            if(stdout) return m.reply(format(stdout));
            return m.reply(this.Response(m, Function, resolve, dir, _b, _c, isQueryCostume, thisName));
          }); 
        } catch (e) {
          return m.reply(format(reject(e)));
        };
      });
    };
  };
  Response (m, Function, resolve, dir, _b, _c, isQueryCostume, thisName) {
    let count_1, count_2, count_3;
    let text_1 = `*CLEAR CACHE*\n\n`;
    count_1 = 1; 
    text_1 += `( *${count_1++}* ) Cache in Clear!\n`;
    text_1 += `( *${count_1++}* ) Session Refreshed Successfully!\n`;
    text_1 += `( *${count_1++}* ) RAM Used Now ${Function.sizeString(process.memoryUsage().rss)}\n`;
    text_1 += `( *${count_1++}* ) Current Session Size ${Function.sizeString(_b)}\n`;
    text_1 += `( *${count_1++}* ) Before deleting a session ${_c.length} Files\n`;
    text_1 += `( *${count_1++}* ) After deleting a session ${fs.readdirSync('database/session').length} Files`;
    const get_1 = m.query.slice(
      m.query.indexOf(
        m.args[0], null
      )
    ).split('-c')[0]
    let text_2 = `\n\n*Cache deletion targeting (costume)*\n`;
    text_2 += `( *${count_1++}* ) Script name ${get_1}\n`;
    const get_2 = m.query.slice(
      m.query.indexOf(
        m.args[2] ? m.args[2] :
        m.args[0] ? m.args[0] :
        thisName,
        null
      )
    ).split('-p')[0] ? m.query.slice(
      m.query.indexOf(
        m.args[2] ? m.args[2] : 
        m.args[0] ? m.args[0] :
        thisName, 
        null
      )
    ).split('-p')[0] : thisName
    text_2 += `( *${count_1++}* ) Cache targets ${get_2}`;
    text_1 += isQueryCostume ? text_2 : "";
    text_1 += `\n\n*List before session deleted*\n`
    count_2 = 1; 
    for(let a of dir) {
      text_1 += `( *${count_2++}* ) ${a}\n`
    };
    text_1 += `\n*List after session deleted*\n`
    count_3 = 1;
    for(let b of fs.readdirSync('database/session')) {
      text_1 += `( *${count_3++}* ) ${b}\n`
    };
    return text_1;
  };
  Category (m, db) {
    let text = `*List Category*\n\n`, count = 1;
    text += `( *${count++}* ) -c (/costume/)\n`;
    text += `( *${count++}* ) -p (/path/)\n\n`;
    text += `*Example*\n`;
    text += `${m.prefix+m.command} query -c path -p\n\n`;
    text += `Use categories to detect files that you want to clear cache, For custom is the placement of the Script folder name and for path is the placement of the name of the custom file.\n`
    text += `for example ${m.prefix+m.command} ${db.config.scriptName === undefined ? "super_getClass-Main" : db.config.scriptName} -c ./lib/structure/handler.js -p`;
    return text;
  };
};
