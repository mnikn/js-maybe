let {
    Maybe
} = require('../dist/nulless');
let {
    Observable
} = require('../node_modules/rxjs');


let maybe = Maybe.nothing();
console.log(maybe.getDangerValue() === null); // => true
console.log(maybe.transform((value) => value + 'inside').isNothing()); // => true, because maybe has no value
maybe.do(value => console.log(value)) // => do nothing, because maybe has no value

maybe = Maybe.just(43);
console.log(maybe.getDangerValue()); // => 43
console.log(maybe.transform(value => value + 'inside').getValue()); // => 43inside
maybe.do(value => console.log(value)); // => 43