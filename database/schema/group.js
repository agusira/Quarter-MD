import { db } from "../index.js";

export class Group {
  constructor(m) {
    this.m = m;
  }
  Expose() {
    if (!this.m) return;
    if (!this.m.isGroup) return;
    let c = this.m.chat, chat = db.group[c];
    if (!chat) db.group[c] = {};
    if (chat) {
      if (!("afk" in chat)) db.group[c].afk = -1;
      if (!("rafk" in chat)) db.group[c].rafk = "";
      if (!("antilinkgroup" in chat)) db.group[c].antilinkgroup = false;
      if (!("antilinkwhatsapp" in chat)) db.group[c].antilinkwhatsapp = false;
      if (!("antilinkyoutube" in chat)) db.group[c].antilinkyoutube = false;
      if (!("antilinktelegram" in chat)) db.group[c].antilinktelegram = false;
      if (!("antilinksnackvideo" in chat)) db.group[c].antilinksnackvideo = false;
      if (!("antilinkinstagram" in chat)) db.group[c].antilinkinstagram = false;
      if (!("antilinkfacebook" in chat)) db.group[c].antilinkfacebook = false;
      if (!("antibadword" in chat)) db.group[c].antibadword = false;
      if (!("mute" in chat)) db.group[c].mute = false;
      if (!("autosticker" in chat)) db.group[c].autosticker = false;
      if (!("badword" in chat)) db.group[c].badword = ["anjeng", "anjing", "asu", "babi", "ngentot", "pepek", "kontol", "bangsat", "memek", "tetek"];
      if (!("welcome" in chat)) db.group[c].welcome = false;
      if (!("leave" in chat)) db.group[c].leave = false;
      if (!("setWelcome" in chat)) db.group[c].setWelcome = "Halo @user selamat datang di group @groupname semoga betah ya";
    } else db.group[c] = {
      afk: -1,
      rafk: "",
      antilinkgroup: false,
      antilinkwhatsapp: false,
      antilinkyoutube: false,
      antilinktelegram: false,
      antilinksnackvideo: false,
      antilinkinstagram: false,
      antilinkfacebook: false,
      antibadword: false,
      mute: false,
      autosticker: false,
      badword: ["anjeng", "anjing", "asu", "babi", "ngentot", "pepek", "kontol", "bangsat", "memek", "tetek"],
      welcome: false,
      leave: false,
      setWelcome: "Halo @user selamat datang di group @groupname semoga betah ya"
    };
  };
};
