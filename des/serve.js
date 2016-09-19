'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveServerlog = require('./serve-serverlog');

var _serveServerlog2 = _interopRequireDefault(_serveServerlog);

var _serveCordova = require('./serve-cordova');

var _serveCordova2 = _interopRequireDefault(_serveCordova);

var _serveCors = require('./serve-cors');

var _serveCors2 = _interopRequireDefault(_serveCors);

var _serveStatic = require('./serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _iserve = require('./iserve');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serve = (0, _express2.default)();


serve.set('x-powered-by', false);
serve.set('etag', false);

exports.default = argv => {

    serve.use(_serveServerlog2.default);
    serve.use(_serveCors2.default);
    serve.use(_serveCordova2.default);

    _iserve.event.emitServeStatic();
    serve.use((0, _serveStatic2.default)(argv));

    serve.listen(argv.port, argv.host, () => {
        console.log(`server running on http://${ argv.host }:${ argv.port }`);
    });
};