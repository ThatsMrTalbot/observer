"use strict";
const events_1 = require("events");
class EventBuffer extends events_1.EventEmitter {
    constructor() {
        super();
        this.buffer = [];
        this.attached = [];
    }
    emit(event, ...args) {
        this.buffer.push({
            event,
            args,
        });
        this.attached.forEach((emitter) => emitter.emit(event, ...args));
        return super.emit(event, ...args);
    }
    replay(emitter) {
        this.buffer.forEach((event) => {
            emitter.emit(event.event, ...event.args);
        });
        this.attached.push(emitter);
        return emitter;
    }
}
exports.EventBuffer = EventBuffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventBuffer;
//# sourceMappingURL=buffer.js.map