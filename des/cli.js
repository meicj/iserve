'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    _iserve2.default.setArgv(argv);
    // global.CLI_OPTIONS = argv;

    (0, _serve2.default)(argv);
};

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

var _iserve = require('./iserve');

var _iserve2 = _interopRequireDefault(_iserve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argv = _yargs2.default.option('s', {
    alias: 'serverlog',
    default: false,
    describe: 'enable server log',
    type: 'boolean'
}).option('c', {
    alias: 'console',
    default: false,
    describe: 'open two-way-console-tool',
    type: 'boolean'
}).option('r', {
    alias: 'livereload',
    default: false,
    describe: 'enable live reload',
    type: 'boolean'
}).option('sync', {
    default: false,
    describe: 'enable sync',
    type: 'boolean'
}).option('mc', {
    alias: 'mockcordova',
    default: false,
    describe: 'mock cordova files',
    type: 'boolean'
}).option('w', {
    alias: 'workingdir',
    default: process.cwd(),
    describe: 'set working dir',
    type: 'string'
}).option('p', {
    alias: 'port',
    default: 3000,
    describe: 'listen port',
    type: 'number'
}).option('host', {
    default: '0.0.0.0',
    describe: 'listen hostname',
    type: 'string'
}).usage('Usage: iserve [options]').example('iserve --livereload', 'enable live reload').help('h').alias('h', 'help').epilog('copyright meicj').argv;

process.on('uncaughtException', err => {
    console.log('whoops! there was an error');
    console.error(err);
});

;