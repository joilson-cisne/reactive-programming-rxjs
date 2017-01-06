import {Observable} from "rxjs"

export const load = (url: string) => {
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
    }).retryWhen(retryStrategy({attemps: 3, delay: 2000}));
};

export const loadWithFetch = (url: string) => {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(res => res.json())
        );
    });
};

const retryStrategy = ({attemps = 4, delay = 1000}) => {
    return (errors) => {
        return errors
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1
            }, 0)
            .takeWhile(acc => acc < attemps)
            .delay(delay);
    };
};

// testing laziness
// loadWithFetch('movies.json')
//     // .subscribe(x => console.log(x));

// load('movies.json')
//     // .subscribe(x => console.log(x));