import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { 
    newWASocket, 
    db, 
    store, 
    Function, 
    attribute
  }) {
    super('owner', {
      parameter: '<query>',
      description: 'Set ID group info into config database',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['setidgci'];
    this.execute = async () => {
      const handler = await Function.pluginLoader('../plugins/events'); 
      const properties = { 
        newWASocket, 
        db, 
        store, 
        Function, 
        attribute
      };
      new handler.simpledb_branch.Execute(m, sock, properties).branch();
      if(!m.args[0]) return m.reply(Function.query(m.prefix+m.command, this.helper.parameter))
      return m.reply(Function.wait(m.sender)).then(() => {
        m.savedb('config')
        db.config.idGroupInfo = m.args[0]
        return m.reply(Function.success('update', m.args[0]));
      });
    };
  };
};