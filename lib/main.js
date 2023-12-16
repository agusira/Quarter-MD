import newWASocket, {
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  generateWAMessageFromContent,
  generateForwardMessageContent,
  PHONENUMBER_MCC
} from "@whiskeysockets/baileys";
// import axios from 'axios';
// import { fileURLToPath } from "url";
import Serialize from './structure/serialize.js';
// import { Boom } from '@hapi/boom';
import readline from "readline";
import { db } from '../database/index.js';
import isFiltered from './structure/handler.js';
import { ConnectionOn, CallOn, GPU, GU, Koneksi } from './utils/index.js';
import optionSocket, { logger, store } from './model/store.js';
import chalk from 'chalk';
import { parsePhoneNumber } from "libphonenumber-js";
import open from "open";
import fs from 'fs';
import path from 'path';

const { state, saveCreds } = await useMultiFileAuthState('./database/session')
// setInterval(() => {
//   db.write()
// }, 1500)

class WAConnection {
  constructor() {
    this.phoneNumber = db.config?.authorNumber[0];
    this.pairingCode = !!this.phoneNumber || process.argv.includes("--pairing-code");
    this.useMobile = process.argv.includes("--mobile");
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    this.question = (text) => new Promise((resolve) => this.rl.question(text, resolve));
    this.sock = newWASocket.default(
      Object.assign(
        new optionSocket(this.pairingCode, this.useMobile), {
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, logger),
        }
      })
    )
  };
  async run() {
    store?.bind(this.sock.ev);
    await this.codePairingAccess();
    await this.codeMobileAccess();
    this.sock.ev.process(async (events) => {
      if (events["connection.update"]) {
        // const { connection } = events["connection.update"];
        // const a = new Koneksi(this.sock, connection, WAConnection)
        // a.run()
        const update = events["connection.update"];
        const p = new ConnectionOn(this.sock, db, update, WAConnection, newWASocket)
        p.start();
      };
      if (events["creds.update"]) {
        await saveCreds();
      };
      if (events["call"]) {
        const m = events["call"][0];
        const p = new CallOn(this.sock, m, db)
        p.start();
      };
      if (events["messages.upsert"]) {
        const { messages } = events["messages.upsert"];
        for (const message of messages) {
          const m = new Serialize(message, this.sock, store)
          const p = new isFiltered(m, this.sock, store, message, newWASocket)
          p.create();
        };
      };
      if (events["group-participants.update"]) {
        const { id, participants, action } = events["group-participants.update"];
        const metadata = await this.sock.groupMetadata(id)
        const p = new GPU(this.sock, db, id, participants, action, metadata)
        p.start();
      };
      if (events["groups.update"]) {
        const groupsUpdate = events["groups.update"];
        console.log(groupsUpdate)
        for (const groupUpdate of groupsUpdate) {
          const metadata = await this.sock.groupMetadata(groupUpdate.id)
          const p = new GU(this.sock, db, groupUpdate, metadata)
          p.start();
        };
      };
    });
    this.sock.copyNForward = async (jid, message, forceForward = false, options = {}) => {
      let vtype
      if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message?.viewOnceMessageV2.message)[0]
        delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message?.viewOnceMessageV2.message[vtype].viewOnce
        message.message = {
          ...message.message?.viewOnceMessageV2?.message
        }
      }
      let mtype = Object.keys(message.message)[0]
      let content = generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != "conversation") context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
      }
      const waMessage = generateWAMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo
          }
        } : {})
      } : {})
      await this.sock.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
      return waMessage
    }

    return this.sock;
  };
  async codePairingAccess() {
    if (this.pairingCode && !this.sock.authState.creds.registered) {
      if (this.useMobile) throw new Error('Cannot use pairing code with mobile api');
      if (!!this.phoneNumber) {
        this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => this.phoneNumber.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: +${this.db.config?.authorNumber[0]}`)));
          process.exit(0);
        };
      } else {
        this.phoneNumber = await this.question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +${this.db.config?.authorNumber[0]} : `)));
        this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => this.phoneNumber.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: +${this.db.config?.authorNumber[0]}`)));
          this.phoneNumber = await this.question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +${this.db.config?.authorNumber[0]} : `)));
          this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
          this.rl.close();
        };
      };
      setTimeout(async () => {
        let code = await this.sock.requestPairingCode(this.phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)));
      }, 3000);
    };
  };
  async codeMobileAccess() {
    if (this.useMobile && !this.sock.authState.creds.registered) {
      const { registration } = this.sock.authState.creds || { registration: {} }
      if (!registration.phoneNumber) {
        this.phoneNumber = await this.question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)));
        this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => this.phoneNumber.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.redBright(`Start with your country's WhatsApp code, Example : ${db.config?.authorNumber[0]}`)));
          this.phoneNumber = await this.question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)));
          this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
        };
        registration.phoneNumber = "+" + this.phoneNumber;
      };
      this.phoneNumber = parsePhoneNumber(registration.phoneNumber);
      if (!this.phoneNumber.isValid()) throw new Error('Invalid phone number: ' + registration.phoneNumber);
      registration.phoneNumber = this.phoneNumber.format("E.164");
      registration.phoneNumberCountryCode = this.phoneNumber.countryCallingCode;
      registration.phoneNumberNationalNumber = this.phoneNumber.nationalNumber;
      const mcc = PHONENUMBER_MCC[this.phoneNumber.countryCallingCode];
      registration.phoneNumberMobileCountryCode = mcc;
      await this.askOTP();
    };
  };
  async enterCode() {
    try {
      const code = await this.question(chalk.bgBlack(chalk.greenBright(`Please Enter Your OTP Code : `)));
      const response = await this.sock.register(code.replace(/[^0-9]/g, '').trim().toLowerCase());
      console.log(chalk.bgBlack(chalk.greenBright("Successfully registered your phone number.")));
      console.log(response);
      this.rl.close();
    } catch (e) {
      console.error('Failed to register your phone number. Please try again.\n', e);
      await this.askOTP()
    };
  };
  async enterCaptcha() {
    const response = await this.sock.requestRegistrationCode({ ...registration, method: 'captcha' });
    const pathFile = path.join(process.cwd(), "tmp", "captcha.png");
    fs.writeFileSync(pathFile, Buffer.from(response.image_blob, 'base64'));
    await open(pathFile);
    const code = await this.question(chalk.bgBlack(chalk.greenBright(`Please Enter Your Captcha Code : `)));
    fs.unlinkSync(pathFile);
    registration.captcha = code.replace(/["']/g, '').trim().toLowerCase();
  };
  async askOTP() {
    if (!registration.method) {
      let code = await this.question(chalk.bgBlack(chalk.greenBright('What method do you want to use? "sms" or "voice" : ')));
      code = code.replace(/["']/g, '').trim().toLowerCase();
      if (code !== 'sms' && code !== 'voice') return await this.askOTP();
      registration.method = code;
    };
    try {
      await this.sock.requestRegistrationCode(registration);
      await this.enterCode();
    } catch (e) {
      console.error('Failed to request registration code. Please try again.\n', e);
      if (e?.reason === 'code_checkpoint') {
        await this.enterCaptcha();
      };
      await this.askOTP();
    };
  };
};
new WAConnection().run();
process.on('uncaughtException', function(err) {
  let e = String(err)
  if (e.includes("Socket connection timeout")) return;
  if (e.includes("rate-overlimit")) return;
  if (e.includes("Connection Closed")) return;
  if (e.includes("Timed Out")) return;
  if (e.includes("Value not found")) return;
});

