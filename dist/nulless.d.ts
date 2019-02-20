import { Observable, Subscription } from "rxjs";

declare namespace nulless {
    class Maybe<T> {

        constructor(value: T | null);

        /**
         * Return nothing maybe
         */
        public static nothing<T>(): Maybe<T>;

        /**
         * Return async nothing maybe
         */
        public static asyncNothing<T>(): AsyncMaybe<T>;

        /**
         * Return valuable maybe
         * @param value value need to be wrapped
         */
        public static just<T>(value: T | null): Maybe<T>;

        /**
         * Return async valuable maybe 
         * @param value value need to be wrapped
         */
        public static asyncJust<T>(value: Observable<T> | null): AsyncMaybe<T>;

        /**
         * Check is it nothing
         */
        public isNothing(): boolean;

        /**
         * Get value, use this function only if you are 100% sure you can get the not-null value.
         */
        public getValue(): T;

        /**
         * Get danger value, use it if you really want to handle null/undefined by yourself.
         */
        public getDangerValue(): T | null;

        /**
         * Transform to another maybe if has value
         * @param transform transform function
         */
        public transform<U>(transform: (value: T) => U): Maybe<U>;
        /**
         * Async transform to another maybe if has value
         * @param transform transform function
         */
        public asyncTransform<U>(transform: (value: T) => Observable<U>): AsyncMaybe<U>;
        /**
         * Do something if has value
         * @param doSomething callback function
         */
        public do(doSomething: (value: T) => void, defaultValue?: T): Maybe<T>;
    }

    class AsyncMaybe<T> extends Maybe<Observable<T>> {
        public subscribe(...args: any[]): Maybe<Subscription>;
    }
}