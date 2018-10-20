import { action, decorate, observable } from 'mobx';

export class RepoStore {
    rootStore;
    loading;
    repos;

    constructor(rootStore, initialState) {
        this.rootStore = rootStore;
        this.hydrate(initialState);
    }

    // See options pattern here:
    // http://2ality.com/2015/01/es6-destructuring.html#simulating-named-parameters-in-javascript
    hydrate({ loading = false, repos = [] } = {}) {
        this.loading = loading;
        this.repos = repos;
    }

    serialize() {
        return {
            loading: this.loading,
            repos: this.repos
        };
    }

    loadRepos() {
        const { githubService } = this.rootStore.services;
        this.loading = true;
        return githubService.fetchTopRepos().then(this.initialize);
    }

    initialize = repos => {
        this.repos = repos;
        this.loading = false;
        return true;
    };
}

decorate(RepoStore, {
    loading: observable,
    repos: observable.ref,
    loadRepos: action,
    initialize: action
});
