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
      m.changelogTime = setInterval(() => {
        db.config.changelogV1 = [
          {
            version: "",
            description: "",
            added: "",
            time: "",
          },
        ];
        db.config.changelogV2 = [
          {
            version: "",
            description: "",
            added: "",
            time: "",
          },
        ]; 
      }, 60 * 1000 * 60 * 24);
      return m;
    };
  };
};