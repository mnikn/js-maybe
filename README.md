# nulless

`nulless` is a javascript/typescript library that helps you handle null/undefined safely and elegance. `nulless` provide a class called `Maybe` to wrap your value, the concept comes from `Monad`. `Maybe` has serval functions to handle null check and support chain call, it can also support async with rxjs.

## Usage

basics usage:

```javascript
import { Maybe } from 'nulless';

let maybe = Maybe.nothing();
console.log(maybe.getDangerValue() === null); // => true
console.log(maybe.transform((value) => value + 'inside').isNothing()); // => true, because maybe has no value
maybe.do(value => console.log(value)) // => do nothing, because maybe has no value

maybe = Maybe.just(43);
console.log(maybe.getDangerValue()); // => 43
console.log(maybe.transform(value => value + 'inside').getValue()); // => 43inside
maybe.do(value => console.log(value)); // => 43
```

code without nulless:

```javascript
let items = [{id: 1, content: {subContent: 2}}, {id: 2, content: null}, {id: 4, content: {subContent: 6}}];
function getItemSubContent(id) {
    if (!id) return null;

    let item = items.find(e => e.id === id);
    if (!item) return null;
    if (!item.content) return null;

    return item.content.subContent;
}

let v1 = getItemSubContent(null);
if (v1) {
    console.log(v1);
}
let v2 = getItemSubContent(1);
if (v2) {
    console.log(v2);
}
let v3 = getItemSubContent(2);
if (v3) {
    console.log(v3);
}
let v4 = getItemSubContent(3);
if (v4) {
    console.log(v4);
}
```

code with nulless:

```javascript
import { Maybe } from 'nulless';

let items = [{
    id: 1,
    content: {
        subContent: 'dsa'
    }
}, {
    id: 2,
    content: null
}, {
    id: 4,
    content: {
        subContent: 'fd'
    }
}];

function getItemSubContent(id) {
    // function transform will return another maybe
    return id.transform(value => items.find(item => item.id === value))
        .transform(value => value.content)
        .transform(value => value.subContent);
}

// function do will call pass-in function if maybe has value
getItemSubContent(Maybe.nothing()).do(value => console.log(value)); // do nothing since get nothing
getItemSubContent(Maybe.just(1)).do(value => console.log(value)); // => dsa, since get actual value
getItemSubContent(Maybe.just(2)).do(value => console.log(value)); // do nothing since get nothing
getItemSubContent(Maybe.just(3)).do(value => console.log(value)); // do nothing since get nothing
```

async nulless with rxjs:

```javascript

import { Maybe } from 'nulless';
import { Observable } from 'rxjs';

function getItemSubContent(id) {
    // function transform will return another maybe
    return id.asyncTransform(value => new Observable(subscriber => {
        let items = [{
            id: 1,
            content: {
                subContent: 'dsa'
            }
        }, {
            id: 2,
            content: null
        }, {
            id: 4,
            content: {
                subContent: 'fd'
            }
        }];
        let result = Maybe.just(items.find(item => item.id === value))
            .transform(value => value.content)
            .transform(value => value.subContent);
        subscriber.next(result);
    }));
}

// function do will call pass-in function if maybe has value
getItemSubContent(Maybe.nothing()).subscribe(value => console.log(value)); // do nothing since get nothing id
getItemSubContent(Maybe.just(1)).subscribe(value => console.log(value)); // => dsa, since get actual value
getItemSubContent(Maybe.just(2)).subscribe(value => console.log(value)); // => nothing maybe, since get nothing item
getItemSubContent(Maybe.just(3)).subscribe(value => console.log(value)); // => nothing maybe, since get nothing item

```

## Install

```bash
npm install nulless
```