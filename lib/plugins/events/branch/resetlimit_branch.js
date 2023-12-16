import { Collection } from '../../collection.js';

export class Execute extends Collection {
  constructor (m, sock, { db }) {
    super('branch/function', {
      function: true,
      public: true
    });
    this.editor = {
      exclusive: {
        type: 'add',
        index: 1,
      },
    };
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.branch = async () => {
      m.checkLimitOut = setInterval(() => {
        db.user[this.m.sender].limit = 100;
      }, 60 * 1000 * 60 * 24);
      return m;
    };
  };
};
