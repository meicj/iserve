import EventEmitter from 'events';
import util from './iserve-util';

const emitter = new EventEmitter();

const staticServeOptions = {
  lastModified: false,
  maxAge: 0,
};

const iserve = {
  argv: null,
  setArgv(v) {
    this.argv = v;
  },
  staticServeOptions,
};

const event = {
  emitServeStatic() {
    emitter.emit('serve-static:start', iserve.argv);
  },
  bindServeStatic(func) {
    emitter.on('serve-static:start', func);
  },
};

export default iserve;

export {
  util,
  event,
};
