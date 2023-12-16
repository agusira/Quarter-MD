import { Collection } from '../../collection.js';
import { format } from 'util';

export class Execute extends Collection {
  constructor(m, sock, { newWASocket, attribute, Function }) {
    super('broadcast', {
      parameter: '<query>',
      description: "Send a broadcast message to the entire group list",
    });
    this.options = {
      permission: 1,
      setup: {
        group: false,
      },
    };
    this.command = ['bcgc'];
    this.execute = async () => {
      try {
        if (!m.query) return m.reply(Function.query(m.prefix + m.command, this.helper.parameter));
        const all = Object.keys(await sock.groupFetchAllParticipating());
        // const regex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
        // const match = m.query.match(regex);
        void await m.reply(`Sedang mengirim broadcast ke ${all.length} grup`);
        for (let i of all) {
          var delayInMilliseconds = 27000;
          await newWASocket.delay(delayInMilliseconds).then(async () => {
            await sock.sendMessage(i, {
              text: `${m.query}`,
              // contextInfo: {
              //   externalAdReply: {
              //     title: match ? "B R O A D C A S T" : '',
              //     body: match ? match[0] : '',
              //     sourceUrl: match ? match[0] : '',
              //     showAdAttribution: match ? true : false,
              //     renderLargerThumbnail: match ? true : false,
              //     mediaType: match ? 1 : 0,
              //     thumbnailUrl: match ? await this.imagesUrl(attribute.groupMetadata.subject, "broadcast group").catch(() => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIjQ8oPYN22yHnTf2ZZQQzP1bX0G03AaJTA&usqp=CAU") : '',
              //   },
              // },
            });
          }).catch((error) => {
            console.error(format(error))
          })
        };
        await m.reply(`Berhasil mengirim broadcast ke ${all.length} grup`);
      } catch (error) {
        console.error(format(error))
      };
    };
  };
  async imagesUrl(q, aut) {
    let data = { "bi": "https://source.unsplash.com/UF_wwDxI6uk/1200x630", "h": "630", "w": "1200", "a.tp": "rect", "a.x": "600", "a.y": "315", "a.w": "751", "a.h": "313", "a.c": "#ffffff", "a.rx": "20", "a.ry": "20", "b.tp": "textbox", "b.x": "594", "b.y": "306", "b.w": "603", "b.h": "45", "b.t": q, "b.fs": "40", "b.lh": "1", "b.fw": "400", "b.ff": "Inter", "b.oy": "top", "b.maxHeight": "40", "c.tp": "textbox", "c.x": "765", "c.y": "243", "c.w": "288", "c.h": "40", "c.c": "#555", "c.t": this.getCurrentTime(), "c.ta": "right", "c.fs": "35", "c.lh": "1", "c.fw": "400", "c.ff": "Inter", "c.maxHeight": "30", "d.tp": "textbox", "d.x": "600", "d.y": "397", "d.w": "613", "d.h": "34", "d.t": aut, "d.fs": "30", "d.lh": "1", "d.fw": "400", "d.ff": "Inter", "d.maxHeight": "20", "e.tp": "image", "e.x": "324", "e.y": "245", "e.w": "128", "e.h": "128", "e.sx": "0.5", "e.sy": "0.5", "e.src": "https://logo.clearbit.com/whatsapp.com" }
    let apiURL = 'https://img.bruzu.com/?' + new URLSearchParams(data).toString();
    return apiURL;
  };
  getCurrentTime() {
    const options = {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const now = new Date().toLocaleString('id-ID', options);
    return now;
  };
};
