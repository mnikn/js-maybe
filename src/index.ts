import { Observable, Subscription } from 'rxjs';

/**
 * A value wrapper to handle null/undefined safely
 */
export class Maybe<T>
{
    protected _value: T | null;

    constructor(value: T | null = null) {
        this._value = value;
    }

    /**
     * Return nothing maybe
     */
    public static nothing<T>(): Maybe<T> {
        return new Maybe<T>();
    }

    /**
     * Return async nothing maybe
     */
    public static asyncNothing<T>(): AsyncMaybe<T> {
        return new AsyncMaybe<T>();
    }

    /**
     * Return valuable maybe
     * @param value value need to be wrapped
     */
    public static just<T>(value: T | null): Maybe<T> {
        return new Maybe<T>(value);
    }

    /**
     * Return async valuable maybe 
     * @param value value need to be wrapped
     */
    public static asyncJust<T>(value: Observable<T> | null): AsyncMaybe<T> {
        return new AsyncMaybe<T>(value);
    }

    /**
     * Check is it nothing
     */
    public isNothing(): boolean {
        return !this._value;
    }

    /**
     * Get value, use this function only if you are 100% sure you can get the not-null value.
     */
    public getValue(): T {
        return this._value as T;
    }

    /**
     * Get danger value, use it if you really want to handle null/undefined by yourself.
     */
    public getDangerValue(): T | null {
        return this._value;
    }

    /**
     * Transform to another maybe if has value
     * @param transform transform function
     */
    public transform<U>(transform: (value: T) => U): Maybe<U> {
        return this.isNothing() ? Maybe.nothing<U>() : Maybe.just(transform(this.getValue()));
    }

    /**
     * Async transform to another maybe if has value
     * @param transform transform function
     */
    public asyncTransform<U>(transform: (value: T) => Observable<U>): AsyncMaybe<U> {
        return this.isNothing() ? Maybe.asyncNothing<U>() : Maybe.asyncJust(transform(this.getValue()));
    }

    /**
     * Do something if has value
     * @param doSomething callback function
     */
    public do(doSomething: (value: T) => void, defaultValue?: T): Maybe<T> {
        if (this.isNothing() && !defaultValue) return this;
        const value = this.isNothing() ? defaultValue as T : this.getValue();
        doSomething(value);
        return this;
    }
}

/**
 * An async value wrapper to handle null/undefined safely
 */
export class AsyncMaybe<T> extends Maybe<Observable<T>> {
    public subscribe(...args): Maybe<Subscription> {
        return this.transform(function (value) {
            return value.subscribe(...args);
        });
    }
}