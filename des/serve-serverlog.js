'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _iserve = require('./iserve');

var _iserve2 = _interopRequireDefault(_iserve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = _express2.default.Router();

function getFullURL(req) {
    return `${ req.protocol }://${ req.get('host') }${ req.originalUrl }`;
}

log.all('*', (req, res, next) => {

    if (_iserve2.default.argv.serverlog) {
        console.log(getFullURL(req));
    }

    next();
});

exports.default = log;