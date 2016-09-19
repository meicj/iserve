'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _iserve = require('./iserve');

var _iserve2 = _interopRequireDefault(_iserve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cordova = _express2.default.Router();

const CORDOVA_WWW_DIR = '/www';
const CORDOVA_PLATFORMS_DIR = '/platforms';
const CORDOVA_PLATFORMS_IOS_DIR = `${ CORDOVA_PLATFORMS_DIR }/ios`;
const CORDOVA_PLATFORMS_ANDROID_DIR = `${ CORDOVA_PLATFORMS_DIR }/android`;
const CORDOVA_PLATFORMS_IOS_WWW = `${ CORDOVA_PLATFORMS_IOS_DIR }/platform_www`;
const CORDOVA_PLATFORMS_ANDROID_WWW = `${ CORDOVA_PLATFORMS_ANDROID_DIR }/platform_www`;

const options = {
    lastModified: false,
    maxAge: 0
};

exports.default = cordova;


_iserve.event.bindServeStatic(argv => {

    if (getIsCordovaProject(argv.workingdir)) {
        console.log('cordova project determined');
        cordova.use(_express2.default.static(argv.workingdir + CORDOVA_WWW_DIR, options));
    }
});

cordova.get(['/cordova.js', 'cordova_plugins.js', '/plugins/'], (req, res, next) => {

    const workingDir = _iserve2.default.argv.workingdir;
    const handler = httpHandler(req, res, next);
    const options = {
        root: workingDir,
        maxAge: 0,
        lastModified: false
    };
    const platform = _iserve.util.determineClientPlatform(req);

    if (!getIsCordovaProject(workingDir)) {
        next();
        return;
    }

    if (_iserve2.default.argv.mockcordova) {
        handler.sendMockRes();
        return;
    }

    handler.sendPlatformFile(platform, options);
});

function getIsCordovaProject(workingDir) {
    const determineFile = '/cordova.js';

    return _iserve.util.existsDir(workingDir + CORDOVA_WWW_DIR) && (_iserve.util.existsFile(workingDir + CORDOVA_PLATFORMS_IOS_WWW + determineFile) || _iserve.util.existsFile(workingDir + CORDOVA_PLATFORMS_ANDROID_WWW + determineFile));
}

function httpHandler(req, res, next) {
    return {
        sendPlatformFile(platform, options) {
            let file;
            switch (platform) {
                case _iserve.util.CLIENT_PLATFORM.iOS:
                    file = `${ CORDOVA_PLATFORMS_IOS_WWW }${ req.path }`;
                    break;
                case _iserve.util.CLIENT_PLATFORM.Android:
                    file = `${ CORDOVA_PLATFORMS_ANDROID_WWW }${ req.path }`;
                    break;
                default:
                    this.sendMockRes();
                    return;
            }

            res.sendFile(file, options, err => {
                if (err) {
                    console.error(err);
                    res.status(err.status).end();
                }
            });
        },
        sendMockRes() {
            res.status(200).send('//mocked by iServe').end();
        }
    };
}