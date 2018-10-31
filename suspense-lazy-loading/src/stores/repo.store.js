import { action, decorate, observable } from 'mobx';

export class RepoStore {
    rootStore;
    loading;
    repos;

    constructor(rootStore) {
        this.rootStore = rootStore;
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
