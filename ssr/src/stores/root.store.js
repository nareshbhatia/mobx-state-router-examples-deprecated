import { RouterState, RouterStore } from 'mobx-state-router';
import { GitHubService } from '../services/github.service';
import { RepoStore } from './repo.store';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore;
    repoStore;

    services = {
        githubService: new GitHubService()
    };

    constructor(initialState = {}) {
        this.routerStore = new RouterStore(
            this,
            routes,
            notFound,
            initialState.routerStore
        );
        this.repoStore = new RepoStore(this, initialState.repoStore);
    }

    serialize() {
        return {
            routerStore: this.routerStore.serialize(),
            repoStore: this.repoStore.serialize()
        };
    }
}
