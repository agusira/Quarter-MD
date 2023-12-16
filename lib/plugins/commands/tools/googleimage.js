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
      permission: 0,
      setup: {
         group : false ,
      },
    };
    this.command = ['googleimage'] 
    this.execute = async ()=>{ 
const hasil = await (await import('@bochilteam/scraper')).googleImage(m.query)
return sock.sendMessage(m.chat, {image: {url: await Function.pickRandom(hasil)}})
}
  }
}