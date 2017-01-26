import {EventBuffer} from './buffer'
import {EventEmitter} from 'events'

export type OnNext<T> = (data : T) => void
export type OnError = (data : any) => void
export type OnDone = () => void
export type Callback<T> = (next : OnNext<T>, error : OnError, done : OnDone) => void
export type Itterator<T> = (next : T) => void | Promise<void>

export class Observer<T> {
    
    private emitter : EventBuffer
    
    constructor(callback : Callback<T>) {
        this.emitter = new EventBuffer();

        try {
            callback(
                this.onNext.bind(this),
                this.onError.bind(this),
                this.onDone.bind(this),
            )
        } catch(error) {
            this.onError.call(this, error);
        }
    }

    private onNext(data : T) {
        this.emitter.emit('next', data)
    }

    private onError(error : any) {
        this.emitter.emit('err', error)        
    }

    private onDone() {
        this.emitter.emit('done')
    }

    itterate(i : Itterator<T>) : Promise<void> {
        let emitter = new EventEmitter()

        let promise = new Promise<void>((res, rej) => {
            emitter.on('next', (next) => {
                i(next)
            })
            emitter.on('err', (error) => {
                rej(error)
            })
            emitter.on('done', () => {
                res()
            })
        })

        this.emitter.replay(emitter);

        return promise;
    }
    
}
export default Observer;