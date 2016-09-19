import EventEmitter from 'events';
import util from './iserve-util';

const emitter = new EventEmitter();

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

export default iserve;

export {
    util,
    event
};
