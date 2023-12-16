import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor(m, sock, { 
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super('profile', {
      description: 'Check the limit and how much time will the limit be reset',
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ['checklimit'];
    this.execute = async () => {
      const handler = await Function.pluginLoader('../plugins/events'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
      };
      new handler.resetlimit_branch.Execute(m, sock, properties).branch();
      m.reply(this.checkLimit(m, db, Function))
    };
  };
  checkLimit (m, db, Function) {
    let text = `*CHECK LIMIT*\n\n`;
    text += `Sisa limit kamu sekarang: ${db.user[m.sender].limit}\n`;
    text += `Limit kamu bakal di reset dalam Waktu 24 Jam!\n\n`;
    text += `Waktu menuju reset: *${Function.timers(m.checkLimitOut?._idleStart)}*, Setelah 24 jam/1 Hari penuh bot aktif, Limit kamu sudah di reset sepenuhnya.`;
    return text;
  };
};