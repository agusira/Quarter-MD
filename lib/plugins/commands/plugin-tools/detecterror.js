import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock) {
    super('owner', {
      description: 'Detect errors in the command plugin',
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['detecterror'];
    this.execute = async () => {
      this.readFitur().then(() => {
        return m.reply(`Tidak ada yang error, Command bekerja dengan sempurna!`);
      }).catch((error) => {
         return m.reply(`*Error Terdeteksi!*\n\n*Lokasi* *** ${format(error)}`);
      });
    };
  };
};