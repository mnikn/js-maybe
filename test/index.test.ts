import * as chai from 'chai';

import { Maybe } from '../src';

const expect = chai.expect;
describe('Maybe', () => {

    it('should return nothing', () => {
        const maybe = Maybe.nothing<string>();
        expect(maybe.isNothing()).is.true;
    });

    it('should get valuable content', () => {
        const maybe = Maybe.just<string>('45');
        expect(maybe.getValue()).equals('45');
    });

    it('should do if not null', () => {
        let maybe = Maybe.nothing<string>();
        let tmp = null;
        maybe.do(() => tmp = 'inside!');
        expect(tmp).is.null;

        maybe = Maybe.just<string>('test');
        maybe.do((value) => tmp = value);
        expect(tmp).is.equals('test');
    });

    it('should do if not null', () => {
        let maybe = Maybe.nothing<string>();
        let tmp = null;
        maybe.do(() => tmp = 'inside!');
        expect(tmp).is.null;

        maybe = Maybe.just<string>('test');
        maybe.do((value) => tmp = value);
        expect(tmp).is.equals('test');
    });

    it('should transform if not null', () => {
        let maybe = Maybe.nothing<string>();
        expect(maybe.tansform(() => 'inside!').isNothing()).is.true;

        maybe = Maybe.just<string>('test');
        expect(maybe.tansform((value) => value + 'good').getValue()).is.equals('testgood');
    });

});