import {Observable} from 'rxjs';
import {load, loadWithFetch} from "./loaders";

let source = Observable.merge(
    Observable.of(1),
    Observable.from([2, 3, 4]),
    Observable.throw(new Error('Stop!')),
    Observable.of(5)
).catch(err => {
    console.log(`catch: ${err}`);
    return Observable.of(10);
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
