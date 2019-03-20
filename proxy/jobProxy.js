"use strict"

const fs = require("fs");
const ScpClient = require("scp2");
const config = require("../config/config");
const FUtil = require("../util/FUtil");

/**
 * cleanEnv
 * 清理云服务器备份环境
 * @param {String} path
 */
exports.cleanFolder = async function (path) {
  return new Promise((resolve, reject) => {
    let command = config.commands.cleanEnv;
    command += path;
    console.log(command);
    FUtil.execCommand(command)
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * createBack
 * 创建云服务器备份
 */
exports.createBack = async function (fromPath, toPath) {
  return new Promise((resolve, reject) => {
    let command = config.commands.createBackup;
    command += `${toPath} ${fromPath}`; 
    FUtil.execCommand(command)
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * findLocalFolder
 * 确定本地最新的版本内包含的文件夹
 */
exports.findLocalFolder = function () {
  let resFolders = [];
  const folder1 = `${config.workspace}\\${config.svnUpdate}`;
  const folder2 = `${config.workspace}\\${config.svnModules}`;
  const paths1 = fs.readdirSync(folder1);
  const paths2 = fs.readdirSync(folder2);
  const path1 = getMaxOfArray(paths1);
  const path2 = getMaxOfArray(paths2);
  if (path1) {
    resFolders.push(`${folder1}\\${path1}`);
  }
  if (path2) {
    resFolders.push(`${folder2}\\${path2}`);
  }
  return resFolders;
};

/**
 * pushCode
 * 推送代码到云服务器对应位置
 * @param {String} path
 * @param {String} subfolder
 */
exports.pushCode = function (path, subfolder) {
  return new Promise((resolve, reject) => {
    if (path) {
      ScpClient.scp(`${path}\\${subfolder}`, {
        host: config.server.host,
        username: config.server.username,
        password: config.server.password,
        path: config.server.destination + '\\' + subfolder
      }, function (err) {
        if (!err) {
          resolve({ errcode: 500, errmsg: err });
        } else {
          resolve({ errcode: 200, errmsg: 'ok' });
        }
      });
    } else {
      resolve();
    }
  });
};

function getMaxOfArray(numArray) {
  if (numArray.length === 0) {
    return false;
  } else {
    let max = numArray[0];
    for (let i = 0; i < numArray.length; i++) {
      if (max < numArray[i]);
      max = numArray[i];
    }
    return max;
  }
}