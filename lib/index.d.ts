export declare type OnNext<T> = (data: T) => void;
export declare type OnError = (data: any) => void;
export declare type OnDone = () => void;
export declare type Callback<T> = (next: OnNext<T>, error: OnError, done: OnDone) => void;
export declare type Itterator<T> = (next: T) => void | Promise<void>;
export declare class Observer<T> {
    private emitter;
    constructor(callback: Callback<T>);
    private onNext(data);
    private onError(error);
    private onDone();
    itterate(i: Itterator<T>): Promise<void>;
}
export default Observer;
