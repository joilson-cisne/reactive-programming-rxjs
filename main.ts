import {Observable} from 'rxjs';
import {load, loadWithFetch} from "./loaders";

let source = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.error('Stop!');
    // throw new Error('Stop!');
    observer.next(2);
    observer.complete();
});

source.subscribe(
    value => console.log(`value: ${value}`),
    err => console.log(`value: ${err}`),
    () => console.log('complete')
);

// let output = document.getElementById('output');
// let button = document.getElementById('button');

// let click = Observable.fromEvent(button, 'click');

// const renderMovies = (movies) => {
//     movies.forEach(m => {
//         let div = document.createElement('div');
//         div.innerHTML = m.title;
//         output.appendChild(div);
//     });
// }

// click.flatMap(event => loadWithFetch('movies.json'))
//     .subscribe(
//         renderMovies,
//         err => console.log(`error: ${err}`),
//         () => console.log('complete')
//     );
