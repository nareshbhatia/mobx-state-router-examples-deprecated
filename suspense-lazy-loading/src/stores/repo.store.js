import { action, decorate, observable } from 'mobx';
import { LoadingState } from './loading-state';

export class RepoStore {
    rootStore;
    loadingState;
    repos;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.loadingState = new LoadingState('repos');
        this.repos = [];
    }

    loadRepos() {
        const { githubService } = this.rootStore.services;
        this.loadingState.start();
        return githubService
            .fetchTopRepos()
            .then(this.initialize)
            .catch(error => {
                this.loadingState.fail(error);
            });
    }

    initialize = repos => {
        this.repos = repos;
        this.loadingState.end();
        return true;
    };
}

decorate(RepoStore, {
    loadingState: observable,
    repos: observable.ref,
    initialize: action
});
