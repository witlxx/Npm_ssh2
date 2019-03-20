"use strict"

const SshClient = require("ssh2").Client;
const config = require("../config/config");

/**
 * execCommand 
 * @param {String} command
 */
exports.execCommand = async function (command) {
  return new Promise((resolve, reject) => {
    if (!command) {
      resolve({errcode: 401, errmsg: 'invalid command'});
    } else {
      const conn = new SshClient();
      conn.on('ready', function () {
        conn.exec(command, function (err, stream) {
          if (err) {
            reject({errcode: 500, errmsg: err});
          } else {
            stream.on('close', function (code, signal) {
            conn.end();
          }).on('data', function (data) {
            resolve({errcode: 200, errmsg: 'ok'});
          });
          }
        });
      }).on('error', function (err) {
        reject({errcode: 500, errmsg: err});
      }).connect({
        host: config.server.host,
        port: 22,
        username: config.server.username,
        password: config.server.password,
        readyTimeout: 99999,
        tryKeyboard: true,
        debug: console.log
      });
    }
  });
};