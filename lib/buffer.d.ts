/// <reference types="node" />
import { EventEmitter } from 'events';
export interface Event {
    event: string | symbol;
    args: Array<any>;
}
export declare class EventBuffer extends EventEmitter {
    private buffer;
    private attached;
    constructor();
    emit(event: string | symbol, ...args: any[]): boolean;
    replay(emitter: EventEmitter): EventEmitter;
}
export default EventBuffer;
