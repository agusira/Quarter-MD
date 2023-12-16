import { Collection } from '../../collection.js';
import { Group } from '../../index.js';

export class Execute extends Collection {
  constructor (m, sock) {
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
      if(m.isGroup) {
        new Group(m).Expose()
      };
      return m
    };
  };
};