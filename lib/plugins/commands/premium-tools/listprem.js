import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { db, Function }) {
    super ('owner', {
      description: 'List premium users to the bot database',
    })
    this.command = ['listprem']
    this.execute = async () => {
      let text = `*LIST PREMIUM*\n\n`;
      let no = 1;
      for(let obj of db.config?.prems) {
        text += `${no++}. ${obj}\n`
      };
      text += `Total: ${Object.keys(db.config?.prems).length}`
      return m.reply(text)
    }
  }
}