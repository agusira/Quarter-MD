import Event from 'events';
import bytes from 'bytes';
import fs from 'fs';

export let Metadata = new Map();
Event.EventEmitter.defaultMaxListeners = Infinity

const ramCheck = setInterval(() => {
  var ramUsage = process.memoryUsage().rss
  if(ramUsage >= bytes('500mb')) {
    clearInterval(ramCheck)
    process.send('reset')
  }
}, 60 * 1000)

if(!fs.existsSync('./temp')) fs.mkdirSync('./temp')
setInterval(() => {
  try {
    const tmpFiles = fs.readdirSync('./temp')
    if(tmpFiles.length > 0) {
      tmpFiles.filter(v => !v.endsWith('.file')).map(v => fs.unlinkSync('./temp/' + v))
    }
  } catch {}
}, 60 * 1000 * 10)