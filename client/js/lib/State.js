import { isObject } from './utils';

export class State {
    constructor(state = {}) {
        this.state = state;
        this.setState = this.setState.bind(this);
    }

    setState(newState = {}) {
        if (isObject(newState)) {
            this.state = {
                ...this.state,
                ...newState
            };
        }
    }
}