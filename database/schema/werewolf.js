import { db } from "../index.js";

export class Werewolf {
  constructor(m) {
    this.m = m;
  }
  Expose() {
    if(!this.m) return;
    if(!this.m.isGroup) return;
    let c = this.m.chat, s = this.m.sender, ww = db.werewolf[c];
    if(!ww) db.werewolf[c] = {};
    if(ww) {
      if(!("room" in ww)) db.werewolf[c].room = c;
      if(!("owner" in ww)) db.werewolf[c].owner = s;
      if(!("status" in ww)) db.werewolf[c].status = false;
      if(!("iswin" in ww)) db.werewolf[c].iswin = null;
      if(!("cooldown" in ww)) db.werewolf[c].cooldown = null;
      if(!("day" in ww)) db.werewolf[c].day = 0;
      if(!("time" in ww)) db.werewolf[c].time = "malem";
      if(!("player" in ww)) db.werewolf[c].player = [];
      if(!("dead" in ww)) db.werewolf[c].dead = [];
      if(!("voting" in ww)) db.werewolf[c].voting = false;
      if(!("seer" in ww)) db.werewolf[c].seer = false;
      if(!("guardian" in ww)) db.werewolf[c].time = [];
    } else db.werewolf[c] = {
      room: c,
      owner: s,
      status: false,
      iswin: null,
      cooldown: null,
      day: 0,
      time: "malem",
      player: [],
      dead: [],
      voting: false,
      seer: false,
      guardian: [],
    };
  };
};