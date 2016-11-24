'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cors = new _express2.default.Router();

cors.all('*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    const headerACRH = req.header('Access-Control-Request-Headers') || '*';

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': headerACRH,
      'Access-Control-Max-Age': 1728000
    });
    res.status(204).end();
  } else {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  }
});

exports.default = cors;