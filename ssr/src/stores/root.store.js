import { RouterState, RouterStore } from 'mobx-state-router';
import { ContentfulService } from '../services/contentful.service';
import { GitHubService } from '../services/github.service';
import { ItemStore } from './item.store';
import { RepoStore } from './repo.store';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore;
    repoStore;
    itemStore;

    services = {
        githubService: new GitHubService(),
        contentfulService: new ContentfulService(
            process.env.REACT_APP_CONTENTFUL_SPACE_ID,
            process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
        )
    };

    constructor(initialState = {}) {
        this.routerStore = new RouterStore(
            this,
            routes,
            notFound,
            initialState.routerStore
        );
        this.repoStore = new RepoStore(this, initialState.repoStore);
        this.itemStore = new ItemStore(this, initialState.itemStore);

        // Initialize error hook on RouterStore
        this.routerStore.setErrorHook(err => {
            console.error(err);
        });
    }

    serialize() {
        return {
            routerStore: this.routerStore.serialize(),
            repoStore: this.repoStore.serialize(),
            itemStore: this.itemStore.serialize()
        };
    }
}
