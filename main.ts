import {
    Observable,
    Observer
} from 'rxjs';

let numbers = [10, 20, 30];
let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`value: ${value}`),
    err => console.log(`error: ${err}`),
    () => console.log('complete')
);
