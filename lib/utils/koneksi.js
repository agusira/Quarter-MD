import { Boom } from "@hapi/boom"

export class Koneksi {
  constructor(sock, connection, start) {
    this.sock = sock
    this.connection = connection
    this.start = start
  }
  run() {
    if (this.connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again"); this.sock.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting...."); new this.start();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting..."); new this.start();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); this.sock.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log("Device Logged Out, Please Scan Again And Run."); this.sock.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting..."); new this.start();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting..."); new this.start();
      } else sock.end(`Unknown DisconnectReason: ${reason}|${this.connection}`);
    } else {
      console.log("Connection Opened...")
    }
  }
}

