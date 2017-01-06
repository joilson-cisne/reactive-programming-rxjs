import {Observable} from 'rxjs';

let numbers = [10, 20, 40];

let source = Observable.create(observer => {
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if(index < numbers.length) {
            setTimeout(produceValue, 1000);
        }
        else {
            observer.complete();
        }
    }

    produceValue();
}).map(n => n / 10)
    .filter(n => n < 4);

source.subscribe(
    value => console.log(`value: ${value}`),
    err => console.log(`error: ${err}`),
    () => console.log('complete')
);
