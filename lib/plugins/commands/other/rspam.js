import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, {
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super("other", {
      parameter: '',
      description: "",
    });
    this.options = {
      permission: 0,
      setup: {
         group : false ,
      },
    };
    this.command =["rspam"]
    this.execute = async () => {
      if(m.quoted) {
        if(m.args[0]) {
          for(let i = 0; i<m.args[0]; i++) {
            await m.reply(m.quoted.text)
          };
        } else {
          return m.reply("jumlah spamnya berapa ?")
        };
      } else {
        return m.reply("reply chat yang mau di spam")
      };
    }
  }
}