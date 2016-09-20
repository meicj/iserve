'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CLIENT_PLATFORM = {
  iOS: 0,
  Android: 1,
  Other: -1
};

exports.default = {
  CLIENT_PLATFORM,
  existsDir(path) {
    try {
      const stat = _fs2.default.statSync(path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  },
  existsFile(path) {
    try {
      const stat = _fs2.default.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  },
  determineClientPlatform(req) {
    const userAgent = req.get('User-Agent');

    if (userAgent.indexOf('iPhone;') >= 0) {
      return CLIENT_PLATFORM.iOS;
    } else if (userAgent.indexOf('Android') >= 0) {
      return CLIENT_PLATFORM.Android;
    }
    return CLIENT_PLATFORM.Other;
  }
};