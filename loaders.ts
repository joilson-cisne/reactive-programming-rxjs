import {Observable} from "rxjs"

export const load = (url: string) => {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        const onLoad = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.responseText);
            }
        };

        xhr.addEventListener('load', onLoad);

        xhr.open('GET', url);
        xhr.send();

        return () => {
            console.log('cleanup');
            xhr.removeEventListener('load', onLoad);
            xhr.abort();
        };
    }).retryWhen(retryStrategy({attemps: 3, delay: 2000}));
};

export const loadWithFetch = (url: string) => {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
        );
    }).retryWhen(retryStrategy());
};

const retryStrategy = ({attemps = 4, delay = 1000} = {}) => {
    return (errors) => {
        return errors
            .scan((acc, value) => {
                ++acc;

                if (acc < attemps) {
                    return acc;
                } else {
                    throw new Error(value);
                }
            }, 0)
            .delay(delay);
    };
};

// testing laziness
// loadWithFetch('movies.json')
//     // .subscribe(x => console.log(x));

// load('movies.json')
//     // .subscribe(x => console.log(x));
