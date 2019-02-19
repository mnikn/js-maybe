# nulless

`nulless` is a typescript/javascript library that helps you handle null/undefined safely and elegance. `nulless` provide a class called `Maybe` to wrap your value, the concept comes from `Monad`. `Maybe` has serval functions to handle null check and support chain call, it can also support async with rxjs.

## Usage

basics usage:

```typescript
let maybe = Maybe.nothing<string>();
console.log(maybe.getDangerValue() === null); // => true
console.log(maybe.transform((value) => value + 'inside')).isNothing()); // => true, because maybe has no value
maybe.do(value => alert(value)) // => donothing, because maybe has no value

maybe = Maybe.just<string>(43);
console.log(maybe.getDangerValue()); // => 43
console.log(maybe.transform(value => value + 'inside').getValue()); // => 43inside
maybe.do(value => alert(value)); // => 43
```

code without nulless:

```typescript
let items = [{id: 1, content: {subContent: 2}}, {id: 2, content: null}, {id: 4, content: {subContent: 6}}];
function getItemSubContent(id) {
    if (!id) return null;

    let item = items.find(e => e.id === id);
    if (!item) return null;
    if (!item.content) return null;

    return item.content.subcontent;
}

let v1 = getItemSubContent(null);
if (v1) {
    alert(v1);
}
let v2 = getItemSubContent(1);
if (v2) {
    alert(v2);
}
let v3 = getItemSubContent(2);
if (v3) {
    alert(v3);
}
let v4 = getItemSubContent(3);
if (v4) {
    alert(v4);
}
```

code with nulless:

```typescript
import { Maybe } from 'nulless';

let items = [{id: 1, content: {subContent: 2}}, {id: 2, content: null}, {id: 4, content: {subContent: 6}}];
function getItemSubContent(id: Maybe<number>): Maybe<string> {
    // function transform will return another maybe
    return id.transform(value => items.find(item => item.id === value))
             .transform(value => value.content)
             .transform(value => value.subcontent);
}

// function do will call pass-in function if maybe has value
getItemSubContent(Maybe.nothing<number>()).do(value => alert(value)); // do nothing since get nothing
getItemSubContent(Maybe.just<number>(1)).do(value => alert(value)); // alert 2 since get actual value
getItemSubContent(Maybe.just<number>(2)).do(value => alert(value)); // do nothing since get nothing
getItemSubContent(Maybe.just<number>(3)).do(value => alert(value)); // do nothing since get nothing
```

async nulless with rxjs:

```typescript

import { Maybe } from 'nulless';

let items = [{id: 1, content: {subContent: 2}}, {id: 2, content: null}, {id: 4, content: {subContent: 6}}];

function getItemSubContent(id: Maybe<number>): Maybe<string> {
    // function transform will return another maybe
    return id.asyncTransform(value => new Observalbe<any>(subscriber => {
                let items = [{id: 1, content: {subContent: 2}}, {id: 2, content: null}, {id: 4, content: {subContent: 6}}];
                subscriber.next(items.find(item => item.id === value));
             })
             .subscribe()
             .transform(value => value.content)
             .transform(value => value.subcontent);
}

// function do will call pass-in function if maybe has value
getItemSubContent(Maybe.nothing<number>()).do(value => alert(value)); // do nothing since get nothing
getItemSubContent(Maybe.just<number>(1)).do(value => alert(value)); // alert 2 since get actual value
getItemSubContent(Maybe.just<number>(2)).do(value => alert(value)); // do nothing since get nothing
getItemSubContent(Maybe.just<number>(3)).do(value => alert(value)); // do nothing since get nothing
```

## Install

```bash
npm install nulless
```