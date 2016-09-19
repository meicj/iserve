'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.event = exports.util = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _iserveUtil = require('./iserve-util');

var _iserveUtil2 = _interopRequireDefault(_iserveUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emitter = new _events2.default();

const iserve = {
    argv: null,
    setArgv(v) {
        this.argv = v;
    }
};

const event = {
    emitServeStatic() {
        emitter.emit('serve-static:start', iserve.argv);
    },
    bindServeStatic(func) {
        emitter.on('serve-static:start', func);
    }
};

exports.default = iserve;
exports.util = _iserveUtil2.default;
exports.event = event;