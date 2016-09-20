import express from 'express';
import iserve, { util, event } from './iserve';

const cordova = new express.Router();

const CORDOVA_WWW_DIR = '/www';
const CORDOVA_PLATFORMS_DIR = '/platforms';
const CORDOVA_PLATFORMS_IOS_DIR = `${CORDOVA_PLATFORMS_DIR}/ios`;
const CORDOVA_PLATFORMS_ANDROID_DIR = `${CORDOVA_PLATFORMS_DIR}/android`;
const CORDOVA_PLATFORMS_IOS_WWW = `${CORDOVA_PLATFORMS_IOS_DIR}/platform_www`;
const CORDOVA_PLATFORMS_ANDROID_WWW = `${CORDOVA_PLATFORMS_ANDROID_DIR}/platform_www`;

export default cordova;

function getIsCordovaProject(workingDir) {
  const determineFile = '/cordova.js';

  return util.existsDir(workingDir + CORDOVA_WWW_DIR)
    && (
      util.existsFile(workingDir + CORDOVA_PLATFORMS_IOS_WWW + determineFile) ||
      util.existsFile(workingDir + CORDOVA_PLATFORMS_ANDROID_WWW + determineFile)
    );
}

function httpHandler(req, res) {
  return {
    sendPlatformFile(platform, options) {
      let file;
      switch (platform) {
        case util.CLIENT_PLATFORM.iOS:
          file = `${CORDOVA_PLATFORMS_IOS_WWW}${req.path}`;
          break;
        case util.CLIENT_PLATFORM.Android:
          file = `${CORDOVA_PLATFORMS_ANDROID_WWW}${req.path}`;
          break;
        default:
          this.sendMockRes();
          return;
      }

      res.sendFile(file, options, (err) => {
        if (err) {
          console.error(err);
          res.status(err.status).end();
        }
      });
    },
    sendMockRes() {
      res.status(200).send('//mocked by iServe').end();
    },
  };
}

event.bindServeStatic((argv) => {
  if (getIsCordovaProject(argv.workingdir)) {
    console.log('cordova project determined');
    cordova.use(express.static(
      argv.workingdir + CORDOVA_WWW_DIR,
      iserve.staticServeOptions
    ));
  }
});

cordova.get(
  ['/cordova.js', 'cordova_plugins.js', '/plugins/'],
  (req, res, next) => {
    const workingDir = iserve.argv.workingdir;
    const handler = httpHandler(req, res, next);
    const options = Object.assign(
      {
        root: workingDir,
      },
      iserve.staticServeOptions
    );
    const platform = util.determineClientPlatform(req);

    if (!getIsCordovaProject(workingDir)) {
      next();
      return;
    }

    if (iserve.argv.mockcordova) {
      handler.sendMockRes();
      return;
    }

    handler.sendPlatformFile(platform, options);
  });
