import {EventEmitter} from 'events'

export interface Event {
    event : string | symbol
    args : Array<any>
}

export class EventBuffer extends EventEmitter {
    private buffer : Array<Event>
    private attached : Array<EventEmitter>

    constructor() {
        super();
        this.buffer = [];
        this.attached = [];
    }
 
    emit(event: string | symbol, ...args: any[]) : boolean {
        this.buffer.push({
            event,
            args,
        });

        this.attached.forEach((emitter) => 
            emitter.emit(event, ...args)
        );        

        return super.emit(event, ...args);
    }

    replay(emitter : EventEmitter) {
        this.buffer.forEach((event) => {
            emitter.emit(event.event, ...event.args);
        })

        this.attached.push(emitter);

        return emitter;
    }
}

export default EventBuffer