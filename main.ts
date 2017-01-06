import {
    Observable,
    Observer
} from 'rxjs';

let numbers = [10, 20, 30];
let source = Observable.from(numbers);

class MyObservable implements Observer<number> {
    next(value) {
        console.log(`value: ${value}`);
    }

    error(e) {
        console.log(`error: ${e}`);
    }

    complete() {
        console.log('complete');
    }
}

source.subscribe(new MyObservable());
