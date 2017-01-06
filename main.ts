import {Observable} from 'rxjs';

let numbers = [10, 20, 30];
let source = Observable.from(numbers);

class MyObservable {
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
