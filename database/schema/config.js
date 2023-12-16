import { db } from "../index.js";

export class Config {
  constructor(m) {
    this.m = m;
  }
  Expose() {
    if (!this.m) return;
    let config = db.config;
    if (!config) db.config = {};
    if (config) {
      if (!("authorName" in config)) db.config.authorName = "Arifi Razzaq";
      if (!("authorNumber" in config)) db.config.authorNumber = ["6283193905842"];
      if (!("mods" in config)) db.config.mods = ["6283193905842"];
      if (!("prems" in config)) db.config.prems = ["6283193905842"];
      if (!("botName" in config)) db.config.botName = "Quarter-MD";
      if (!("changelogV1" in config)) db.config.changelogV1 = [
        {
          version: "",
          description: "",
          added: "",
          time: "",
        }
      ];
      if (!("changelogV2" in config)) db.config.changelogV2 = [
        {
          version: "",
          description: "",
          update: "",
          time: "",
        }
      ];
      if (!("createlist" in config)) db.config.createlist = [
        {
          sewa: [],
          premium: [],
        }
      ];
      if (!("isPublic" in config)) db.config.isPublic = true;
      if (!("chat" in config)) db.config.chat = 0;
      if (!("description" in config)) db.config.description = "Subscribe Channel Youtube: Arifi Razzaq Ofc, Untuk Informasi Update Script Bot WhatsApp Terbaru.";
      if (!("idGroupInfo" in config)) db.config.idGroupInfo = "";
      if (!("anticall" in config)) db.config.anticall = false;
      if (!("apikey" in config)) db.config.apikey = [
        {
          "https://api.zahwazein.xyz": "",
          "https://skizo.tech": ""
        }
      ];
    } else db.config = {
      authorName: "Arifi Razzaq",
      authorNumber: ["6283193905842"],
      mods: ["6283193905842"],
      prems: ["6283193905842"],
      botName: "Quarter-MD",
      changelogV1: [
        {
          version: "",
          description: "",
          added: "",
          time: "",
        }
      ],
      changelogV2: [
        {
          version: "",
          description: "",
          update: "",
          time: "",
        }
      ],
      createlist: [
        {
          sewa: [],
          premium: [],
        }
      ],
      isPublic: true,
      chat: 0,
      description: "Subscribe Channel Youtube: Arifi Razzaq Ofc, Untuk Informasi Update Script Bot WhatsApp Terbaru.",
      idGroupInfo: "",
      homepage: "https://youtube.com/@arifirazzaq2001?si=CL4bgNogCzil_Mh5",
      anticall: false,
      apikey: [
        {
          "https://api.zahwazein.xyz": "",
          "https://skizo.tech": ""
        }
      ],
    };
  };
};
