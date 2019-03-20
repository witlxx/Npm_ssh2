"use strict"

let config = {
  workspace: 'D:\\softwares\\jenkins\\workspace',
  svnUpdate: 'svnUpate',
  svnModules: 'svnModules',
  server: {
    username: 'rst123456',
    password: 'rst123456',
    host: '192.168.252.129',
    destination: '/lixinxian/'
  },
  folders: {
    bin: 'bin',
    business: 'business',
    jobs: 'jobs',
    proxy: 'proxy',
    public: 'public',
    routes: 'routes',
    util: 'util',
    views: 'views',
    images: 'images',
    javascripts: 'javascripts',
    stylesheets: 'stylesheets'
  },
  commands: {
    cleanEnv: 'rm -rf ',
    createBackup: `tar -zcvPf `,
    startServer: 'C:\\MicroServer\\start.bat',
    stopServer: 'C:\\MicroServer\\stop.bat'
  }
};

module.exports = config;