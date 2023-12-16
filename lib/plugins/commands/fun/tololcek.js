import { Collection } from "../../collection.js";

export class Execute extends Collection {
  constructor(m, sock, { Function }) {
    super("fun", {
      description: "To test the command bot can or not",
    });
    this.options = {
      permission: 0,
      setup: {
        group: false,
      },
    };
    this.command = ["tololcek"];
    this.execute = async () => {
      const tolol = [
        "Tolol Level : 4%\n\nAMAN BANGET!",
        "Tolol Level : 7%\n\nMasih Aman",
        "Tolol Level : 12%\n\nAman Kok",
        "Tolol Level : 22%\n\nHampir Aman",
        "Tolol Level : 27%\n\nTolol dikit",
        "Tolol Level : 35%\n\nTolol ¼",
        "Tolol Level : 41%\n\nDah lewat dri Aman",
        "Tolol Level : 48%\n\nSetengah Tolol",
        "Tolol Level : 56%\n\nLu Tolol juga",
        "Tolol Level : 64%\n\nLumayan Tolol",
        "Tolol Level : 71%\n\nHebatnya ketololan lu",
        "Tolol Level : 1%\n\n99% LU GAK TOLOL!",
        "Tolol Level : 77%\n\nGak akan Salah Lagi dah tololnya lu",
        "Tolol Level : 83%\n\nDijamin tololnya",
        "Tolol Level : 89%\n\nTolol Banget!",
        "Tolol Level : 94%\n\nSetolol Om Deddy😂",
        "Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!",
        "Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!",
        "Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!",
        "Tolol Level : 100%\n\nLU ORANG TERTOLOL YANG PERNAH ADA!!!",
      ];
      m.reply(`“${Function.pickRandom(tolol)}”`);
    };
  }
}
