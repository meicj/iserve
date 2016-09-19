'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staticServe = _express2.default.Router();

const options = {
    lastModified: false,
    maxAge: 0
};

exports.default = argv => {
    staticServe.use(_express2.default.static(argv.workingdir, options));
    return staticServe;
};