import React, { lazy, Suspense, createElement } from 'react';
import { inject, observer } from 'mobx-react';
import { Header } from './header';

const viewMap = {
    home: lazy(() => import('./pages/home-page')),
    github: lazy(() => import('./pages/github-page')),
    notFound: lazy(() => import('./pages/not-found-page'))
};

export const Shell = inject('rootStore')(
    observer(
        class extends React.Component {
            render() {
                const { rootStore } = this.props;
                const { routerStore } = rootStore;
                const routeName = routerStore.routerState.routeName;
                const view = viewMap[routeName];
                if (!view) return null;

                return (
                    <React.Fragment>
                        <Header />
                        <Suspense fallback={<></>}>
                            {createElement(view)}
                        </Suspense>
                    </React.Fragment>
                );
            }
        }
    )
);
