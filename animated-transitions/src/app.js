import React from 'react';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';

import { Shell } from './shell';
import { RootStore } from './stores';
import { history } from './utils/history';

// Create the rootStore
const rootStore = new RootStore();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

export const App = () => (
    <Provider rootStore={rootStore}>
        <Shell />
    </Provider>
);
