"use strict"

const jobPrxoy = require("../proxy/jobProxy");
const moment = require("moment");

const b = jobPrxoy.findLocalFolder();
console.log(b);
async function aaa() {
  try {
    await jobPrxoy.pushCode(b[0], 'bin');
    const time = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss');
    await jobPrxoy.createBack('/lixinxian/*', `/lxxbackup/lixinxian_${time}.tar.gz`);
    await jobPrxoy.cleanFolder('/lixinxian/*');
    await jobPrxoy.cleanFolder('/lxx/lixinxian');

  } catch (err) {
    console.error(err);
  }
}

aaa();