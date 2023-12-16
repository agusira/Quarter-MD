export class GU {
  constructor(sock, db, groupUpdate, metadata) {
    this.sock = sock;
    this.db = db;
    this.groupUpdate = groupUpdate;
    this.metadata = metadata;
  }
  async start() {
    if (this.groupUpdate.subject) {
      let teks = `The group name has been changed to:\n${this.groupUpdate.subject}`;
      return this.sock.sendMessage(this.groupUpdate.id, {
        text: teks,
        contextInfo: {
          externalAdReply: {
            title: "Groups Update",
            sourceUrl: "",
            previewType: 2,
            thumbnailUrl: "https://telegra.ph/file/bb3cddbf8de33753fbaa2.png",
            renderLargerThumbnail: false,
          },
        },
      });
    }

    // if (this.groupUpdate.announce) {
    //   m.reply("announce")
    // }
  }
}
