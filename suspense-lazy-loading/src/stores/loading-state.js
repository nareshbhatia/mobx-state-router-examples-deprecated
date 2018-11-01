import { action, decorate, observable } from 'mobx';

export class LoadingState {
    loading = true;
    error = null;

    start() {
        this.loading = true;
        this.error = null;
    }

    end() {
        this.loading = false;
    }

    fail(error) {
        this.loading = false;
        this.error = error;
    }
}

decorate(LoadingState, {
    loading: observable,
    error: observable.ref,
    start: action,
    end: action,
    fail: action
});
