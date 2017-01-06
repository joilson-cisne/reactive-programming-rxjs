import {Observable} from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

const load = (url: string) => {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.responseText);
            }
        });

        xhr.open('GET', url);
        xhr.send();
    }).retryWhen(retryStrategy);
};

const retryStrategy = (errors) => {
    return errors
        .scan((acc, value) => {
            console.log(acc, value);
            return acc + 1
        }, 0)
        .takeWhile(acc => acc < 4)
        .delay(1000);
};

const renderMovies = (movies) => {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerHTML = m.title;
        output.appendChild(div);
    });
}

click.flatMap(event => load('moviess.json'))
    .subscribe(
        renderMovies,
        err => console.log(`error: ${err}`),
        () => console.log('complete')
    );
