import { RouterState, RouterStore } from 'mobx-state-router';
import { GitHubService } from '../services/github.service';
import { RepoStore } from './repo.store';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore;
    repoStore;
    itemStore;

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

        // Initialize error hook on RouterStore
        this.routerStore.setErrorHook(err => {
            console.error(err);
        });
    }
}
