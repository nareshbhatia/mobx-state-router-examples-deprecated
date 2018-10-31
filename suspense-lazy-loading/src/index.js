import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';
import App from './app';
import { RootStore } from './stores';
import { history } from './utils/history';
import './index.css';

// Enable strict mode for MobX. This disallows state changes outside of an action
configure({ enforceActions: 'observed' });

// Create the RootStore
const rootStore = new RootStore();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
