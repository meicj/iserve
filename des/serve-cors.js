'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cors = _express2.default.Router();

cors.all('*', (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Keep-Alive,User-Agent,If-Modified-Since,Content-Type',
            'Access-Control-Max-Age': 1728000
        });
        res.status(204).end();
    } else {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    }
});

exports.default = cors;