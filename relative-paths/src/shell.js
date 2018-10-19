import React from 'react';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import { Header } from './header';

const HomePage = () => <h1>Home</h1>;
const AboutPage = () => <h1>About</h1>;
const NotFoundPage = () => <h1>Page Not Found</h1>;

const viewMap = {
    home: <HomePage />,
    about: <AboutPage />,
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
                    <main>
                        <RouterView
                            routerStore={routerStore}
                            viewMap={viewMap}
                        />
                    </main>
                </React.Fragment>
            );
        }
    }
);
