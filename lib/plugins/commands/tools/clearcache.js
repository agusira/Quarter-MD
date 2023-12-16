import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, {
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super("tools", {
      parameter: '',
      description: "",
    });
    this.options = {
      permission: 1,
      setup: {
         group : false ,
      },
    };
    this.command =['clearcache']
    this.execute = async () => {
  if(!m.args[0]) return m.reply("lokasi file nya di mana kak ?")
  let args = "../../"+m.args[0]
 Function.nocache(args).then((module) => m.reply(`berhasil menyegarkan ${module === undefined ? args : undefined}`)).catch(() => m.reply(`maaf kak, lokasi file '${m.args[0]}' tidak di temukan`))
}
  }
}