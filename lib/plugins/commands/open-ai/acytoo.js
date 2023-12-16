import { Collection } from '../../collection.js';
import { Acytoo } from '../../../structure/scrape.js';
import { format } from 'util';

const model = 'gpt-3.5-turbo';
const getAcytooResponse = async (messages, proxy) => {
  const responseChunks = await Acytoo.createAsyncGenerator(model, messages, proxy);
  const responseArray = [];
  for await (const chunk of responseChunks) {
    responseArray.push(chunk);
  }
  return responseArray.join('');
};

export class Execute extends Collection {
  constructor (m, sock, { Function }) {
    super('open-ai', {
      description: 'Ai response from acytoo',
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ['acytoo'];
    this.execute = async () => {
      if(!m.query) return m.reply(Function.query(m.prefix+m.command, 'Pesan yang ingin Anda sampaikan kepada asisten AI'))
      await m.reply(Function.wait(m.sender));
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: m.query },
      ];
      try {
        const proxy = null;
        const response = await getAcytooResponse(messages, proxy);
        await m.reply(response);
      } catch (error) {
        return sock.sendMessage(m.chat, { text: "Maaf, Apikey telah kadaluarsa! Hubungi owner bot untuk melaporkan masalah ini." }, { quoted: m })
      };
    };
  };
};