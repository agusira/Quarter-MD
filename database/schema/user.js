import { db } from "../index.js";

export class User {
  constructor(m) {
    this.m = m;
  }
  Expose() {
    if (!this.m) return;
    if (this.m.sender.endsWith("@g.us")) return
    let s = this.m.sender,
      user = db.user[s];
    if (!user) db.user[s] = {};
    if (user) {
      if (!("afk" in user)) db.user[s].afk = -1;
      if (!("rafk" in user)) db.user[s].rafk = "";
      if (!("lastseen" in user)) db.user[s].lastseen = new Date() * 1;
      if (!("warning" in user)) db.user[s].warning = 0;
      if (!("premium" in user)) db.user[s].premium = false;
      if (!("limit" in user)) db.user[s].limit = 100;
      if (!("banned" in user)) db.user[s].banned = false;
      if (!("expired" in user)) db.user[s].expired = false
      if (!("transaction" in user))
        db.group[c].transaction = [
          {
            fromId: {
              sender: s,
              date: new Date().toDateString(),
              order: "",
              item: 1,
              price: 0,
              paid: "",
              status: "",
            },
          },
        ];
      if (!("hit" in user)) db.user[s].hit = 1;
      if (!("chat" in user)) db.user[s].chat = 1;
    } else
      db.user[s] = {
        afk: -1,
        rafk: "",
        lastseen: new Date() * 1,
        warning: 0,
        limit: 100,
        premium: false,
        banned: false,
        transaction: [
          {
            fromId: {
              sender: s,
              date: new Date().toDateString(),
              order: "",
              item: 1,
              price: 0,
              paid: "",
              status: "",
            },
          },
        ],
        hit: 1,
        chat: 1,
      };
  }
}
