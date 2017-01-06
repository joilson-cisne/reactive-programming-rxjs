import {Observable} from 'rxjs';
import {load, loadWithFetch} from "./loaders";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

const renderMovies = (movies) => {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerHTML = m.title;
        output.appendChild(div);
    });
}

loadWithFetch('moviess.json')
    .subscribe(
        renderMovies,
        err => console.log(`error: ${err}`),
        () => console.log('complete!')
    );

click.flatMap(event => loadWithFetch('movies.json'))
    .subscribe(
        renderMovies,
        err => console.log(`error: ${err}`),
        () => console.log('complete')
    );
