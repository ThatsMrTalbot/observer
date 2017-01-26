"use strict";
const buffer_1 = require("./buffer");
const events_1 = require("events");
class Observer {
    constructor(callback) {
        this.emitter = new buffer_1.EventBuffer();
        try {
            callback(this.onNext.bind(this), this.onError.bind(this), this.onDone.bind(this));
        }
        catch (error) {
            this.onError.call(this, error);
        }
    }
    onNext(data) {
        this.emitter.emit('next', data);
    }
    onError(error) {
        this.emitter.emit('err', error);
    }
    onDone() {
        this.emitter.emit('done');
    }
    itterate(i) {
        let emitter = new events_1.EventEmitter();
        let promise = new Promise((res, rej) => {
            emitter.on('next', (next) => {
                i(next);
            });
            emitter.on('err', (error) => {
                rej(error);
            });
            emitter.on('done', () => {
                res();
            });
        });
        this.emitter.replay(emitter);
        return promise;
    }
}
exports.Observer = Observer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Observer;
//# sourceMappingURL=index.js.map