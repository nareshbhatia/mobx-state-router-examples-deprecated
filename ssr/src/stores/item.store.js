import { action, decorate, observable } from 'mobx';

export class ItemStore {
    rootStore;
    loading;
    items;

    constructor(rootStore, initialState) {
        this.rootStore = rootStore;
        this.hydrate(initialState);
    }

    // See options pattern here:
    // http://2ality.com/2015/01/es6-destructuring.html#simulating-named-parameters-in-javascript
    hydrate({ loading = false, items = [] } = {}) {
        this.loading = loading;
        this.items = items;
    }

    serialize() {
        return {
            loading: this.loading,
            items: this.items
        };
    }

    loadFeaturedItems() {
        const { contentfulService } = this.rootStore.services;
        this.loading = true;
        return contentfulService.fetchFeaturedItems().then(this.initialize);
    }

    initialize = items => {
        this.items = items;
        this.loading = false;
        return true;
    };
}

decorate(ItemStore, {
    loading: observable,
    items: observable.ref,
    loadFeaturedItems: action,
    initialize: action
});
