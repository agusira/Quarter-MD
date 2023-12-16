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
         group : true ,
      },
    };
    this.command = [ 'react' ] 
    this.execute = async () => {
try {
          let reactionMessage = {
            react: {
              text: m.args[0],
              key: {
                remoteJid: m.quoted.participant, 
                fromMe: m.quoted.fromMe,
                id: m.quoted.key.id
              }
            }
          }
          sock.sendMessage(m.chat, reactionMessage)
        } catch (err) {
            m.reply(import("util").then(v => v.format(err)))
        }; 
}
  }
}