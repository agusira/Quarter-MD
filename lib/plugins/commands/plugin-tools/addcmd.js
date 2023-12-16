import { Collection } from '../../collection.js';
import { writeFileSync } from 'fs';

export class Execute extends Collection {
  constructor (m, sock, { newWASocket, db, store, Function, attribute }) {
    super('owner', {
      parameter: '<reply: folder/file> -category',
      description: 'Add commands to the bot database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['addcmd'];
    this.execute = async () => {
      if(!m.query) return m.reply(Function.query(m.prefix+m.command, this.helper.parameter));
      if(m.quoted) {
        await writeFileSync(`./lib/plugins/commands/${m.args[0]}`, m.quoted.text);
	    await sock.sendMessage(m.chat, { text: "Succsess add command " + m.query }, { quoted: m })
	    let text = `*Pembaruan! ${db.config?.botName}*\n`
	    text += `Fitur *${m.prefix}${m.query.split('/')[1].split('.')[0]}* sudah di tambahkan, Silahkan ketik ${m.prefix}menu untuk melihat semua fitur pada bot\n\n`
	    text += `${db.config?.description}`
	    try {
	      if(m.args[1].split('-u')) {
	        let descriptionLoader;
	        try {
	          const { commandPlugin } = await import('../../../structure/handler.js');
	          descriptionLoader = new commandPlugin[m.query.split('/')[1].split('.')[0]].Execute(m, sock, { newWASocket, db, store, Function, attribute }).description;
	        } catch {
	          descriptionLoader = "-";
	        };
	        let obj = {
	          description: descriptionLoader,
	          update: m.query.split('/')[1].split('.')[0],
	          time: Date.now(),
	        };
	        db.config?.changelogV2.push(obj)
	      } else if(m.args[1].split('-a')) {
	        let descriptionLoader;
	        try {
	          descriptionLoader = new commandPlugin[m.query.split('/')[1].split('.')[0]].Execute(m, sock, { newWASocket, db, store, Function, attribute }).description;
	        } catch {
	          descriptionLoader = "-";
	        };
	        let obj = {
	          description: descriptionLoader,
	          added: m.query.split('/')[1].split('.')[0],
	          time: Date.now(),
	        };
	        db.config?.changelogV1.push(obj)
	      } else {
	        return m.reply(Function.input('category', m.prefix+m.command, `${this.helper.parameter}\n\n*List Category*\n• -a (added)\n• -u (update)`))
	      };
	    } catch {
	      return !0
	    };
	    await sock.sendMessage(db.config?.idGroupInfo ? db.config?.idGroupInfo : m.chat, { text }, { quoted: m });
	  } else {
	    await sock.sendMessage(m.chat, { text: "Hanya bisa berupa text, Reply text kamu!" }, { quoted: m })
      };
    };
  };
};