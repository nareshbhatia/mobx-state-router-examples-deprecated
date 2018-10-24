import React from 'react';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import { Header } from './header';
import { ContentfulPage } from './pages/contentful-page';
import { GitHubPage } from './pages/github-page';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';

const viewMap = {
    home: <HomePage />,
    github: <GitHubPage />,
    contentful: <ContentfulPage />,
    notFound: <NotFoundPage />
};

export const Shell = inject('rootStore')(
    class extends React.Component {
        render() {
            const { rootStore } = this.props;
            const { routerStore } = rootStore;

            return (
                <React.Fragment>
                    <Header />
                    <RouterView routerStore={routerStore} viewMap={viewMap} />
                </React.Fragment>
            );
        }
    }
);
