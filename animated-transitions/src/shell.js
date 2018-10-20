import React from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Header } from './header';
import { AboutPage } from './pages/about-page';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import './shell.css';

const viewMap = {
    home: <HomePage />,
    about: <AboutPage />,
    notFound: <NotFoundPage />
};

export const Shell = inject('rootStore')(
    observer(
        class extends React.Component {
            render() {
                const { rootStore } = this.props;
                const { routerStore } = rootStore;
                const routeName = routerStore.routerState.routeName;
                const view = viewMap[routeName];

                return (
                    <React.Fragment>
                        <Header />
                        <div className="content-holder">
                            <TransitionGroup component={null}>
                                <CSSTransition
                                    key={routerStore.routerState.routeName}
                                    timeout={250}
                                    classNames="fade"
                                >
                                    {view}
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </React.Fragment>
                );
            }
        }
    )
);
