'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _iserve = require('./iserve');

var _iserve2 = _interopRequireDefault(_iserve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staticServe = new _express2.default.Router();

exports.default = argv => {
  staticServe.use(_express2.default.static(argv.workingdir, _iserve2.default.staticServeOptions));
  return staticServe;
};