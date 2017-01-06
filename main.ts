import {Observable} from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

const load = (url: string) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        let movies = JSON.parse(xhr.responseText);

        movies.forEach(m => {
            let div = document.createElement('div');
            div.innerHTML = m.title;
            output.appendChild(div);
        });
    });

    xhr.open('GET', url);
    xhr.send();
};

click.subscribe(
    event => load('movies.json'),
    err => console.log(`error: ${err}`),
    () => console.log('complete')
);
