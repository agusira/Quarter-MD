export class CallOn {
  constructor (sock, m, db) {
    this.sock = sock;
    this.m = m;
    this.db = db;
  };
  start () {
    if(this.db.config?.anticall) {
      // if(this.m.status == "offer") {
        this.sock.rejectCall(this.m.id, this.m.from);
      // };
    };
  };
};
