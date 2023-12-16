import { Collection } from '../../collection.js';
import moment from 'moment-timezone';
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock, { store }) {
    super('owner', {
      description: 'see a list of all groups on the bot',
    })
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['listgc'];
    this.execute = async () => {
      const anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
      let teks = `📫 LIST GROUP CHAT\n\nTotal Group : ${anu.length} Group\n\n`
      for (let i of anu) {
        let metadata = await sock.groupMetadata(i)?.then(v => v)?.catch(async() => {
          let u2 =  await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id) 
          let k = ""
          let o = 1;
          let metadat;
          for( let i2 of u2) {
            metadat = await sock.groupMetadata(i2)?.then(v => v)?.catch(error => m.reply(format(error)))
            k += `${o++}. ${metadat.subject != undefined ? metadat.subject : "-"}\nID: ${i2}\nTotal:  ${metadat.participants != undefined ? metadat.participants.length : "-"} Anggota\n\n`
          }
          return await m.reply(k)
        })
        teks += `• Nama : ${metadata.subject != undefined ? metadata.subject : "-"}\n`
        teks += `• Owner : ${metadata.owner != undefined ? '@' + metadata.owner.split('@')[0] : '-'}\n`
        teks += `• ID : ${metadata.id != undefined ? metadata.id : "-"}\n`
        teks += `• Dibuat : ${moment(metadata.creation != undefined ? metadata.creation : 1679557112 * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n`
        teks += `• Member : ${metadata.participants != undefined ? metadata.participants.length : "-"}\n\n────────────────────────\n\n`
      }
      await m.reply(teks)
    }
  }
}