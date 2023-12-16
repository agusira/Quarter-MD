import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { db, attribute }) {
    super("branch/function", {
      function: true,
      public: true,
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.branch = async () => {
      const { isAdmin, isOwner, isROwner, isBotAdmin, groupMetadata } =
        await attribute;
      if (m.isGroup) {
        if (db.group[m.chat].antilinkgroup) {
          // if (m.body.match(/(chat.whatsapp.com)/gi)) {
          if (
            /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i.test(m.body)
          ) {
            const group = await sock.groupInviteCode(m.chat);
            if (!isBotAdmin) {
              return m.reply(
                "*▊▊▊DETECTED LINK▊▊▊*\n\nMaaf, Fungsi ini hanya bisa bekerja ketika bot menjadi admin."
              );
            }

            if (m.body.split("chat.whatsapp.com/")[1] == group) {
              return m.reply(
                "*▊▊▊DETECTED LINK▊▊▊*\n\nAnda mengirim link group:\n" +
                  groupMetadata.subject
              );
            }
            if (isOwner) return m.reply("Anda Owner okey");
            if (isAdmin) return m.reply("Anda admin, anda aman");
            return sock
              .sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender,
                },
              })
              .then(() => {
                return m.reply(
                  `*▊▊▊DETECTED LINK▊▊▊*\n\nLain kali jangan kirim link grup yak di grup ${groupMetadata.subject}`
                );
              });
          }
        }

        if (db.group[m.chat].antilinktiktok) {
          if (m.body.match(/(tiktok.com)/gi)) {
            if (isOwner) return m.reply("Anda Owner okey");
            if (isAdmin) return m.reply("Anda admin, anda aman");
            if (!isBotAdmin) {
              return m.reply(
                "Maaf, Fungsi ini hanya bisa bekerja ketika bot menjadi admin."
              );
            }

            return sock
              .sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender,
                },
              })
              .then(() => {
                return m.reply(
                  `*▊▊▊Antilink Tiktok Terdeteksi▊▊▊*\n\nDilarang kirim link tiktok di grup ${groupMetadata.subject}`
                );
              });
          }
        }

        if(db.group[m.chat].antilinkyoutube){
          if(/youtube.com|youtu.be/i.test(m.body)){
            if (isOwner) return m.reply("Anda Owner okey");
            if (isAdmin) return m.reply("Anda admin, anda aman");
            if (!isBotAdmin) {
              return m.reply(
                "Maaf, Fungsi ini hanya bisa bekerja ketika bot menjadi admin."
              );
            }

            return sock
              .sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender,
                },
              })
              .then(() => {
                return m.reply(
                  `*▊▊▊Antilink YouTube Terdeteksi▊▊▊*\n\nDilarang kirim link YouTube di grup ${groupMetadata.subject}`
                );
              });

          }
        }
        if (db.group[m.chat].antionce) {
          if (/viewOnceMessage/.test(m.mtype)) {
            if (isOwner) return "Anda owner okay";
            return m.reply("*Terdeteksi pesan View Once*").then(() => {
              sock
                .copyNForward(m.chat, m, true, { readViewOnce: true })
                .catch((_) => reply(`*I opened it by force*`));
            });
          }
        }
      }
    };
  }
}
