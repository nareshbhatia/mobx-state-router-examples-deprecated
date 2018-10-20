import React from 'react';
import ReactDOMServer from 'react-dom/server';

import express from 'express';
import fs from 'fs';
import path from 'path';

import { createLocation } from 'history';
import { Provider } from 'mobx-react';
import { StaticAdapter } from 'mobx-state-router';
import App from '../src/app';
import { RootStore } from '../src/stores';

const PORT = process.env.PORT || 3000;
const app = express();

// Valid router paths should be served by this handler
app.get(['/', '/github'], (req, res) => {
    // Point to the html file created by CRA's build tool
    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', (err, indexHtml) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        // Create the RootStore
        const rootStore = new RootStore();

        // Create a static adapter and go to the requested URL
        const staticAdapter = new StaticAdapter(rootStore.routerStore);
        staticAdapter.goToLocation(createLocation(req.url)).then(() => {
            // Now the server state is stable - capture it
            const serverState = JSON.stringify(rootStore.serialize());

            // Render the app as an HTML string
            const rootHtml = ReactDOMServer.renderToString(
                <Provider rootStore={rootStore}>
                    <App />
                </Provider>
            );

            // Inject desired elements into index.html and send it to the client
            return res.send(
                indexHtml
                    .replace(
                        '<div id="root"></div>',
                        `<div id="root">${rootHtml}</div>`
                    )
                    .replace(
                        '<body>',
                        `<body><script>window.__SERVER_STATE__ = ${serverState}</script>`
                    )
            );
        });
    });
});

// Other static resources, such as images, should just be served as is.
// Note: A different approach is shown in Redux docs
// (see https://redux.js.org/recipes/serverrendering#the-server-side), however
// that would mean that each root-level resource will have to be routed specifically.
//     app.use('/static', Express.static('static'));
app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
