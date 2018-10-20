import React from 'react';
import { RouterLink } from 'mobx-state-router';
import './header.css';

export const Header = () => (
    <header>
        <ul className="navbar">
            <li>
                <RouterLink routeName="home" activeClassName="link--active">
                    Static Page
                </RouterLink>
            </li>
            <li>
                <RouterLink routeName="github" activeClassName="link--active">
                    Dynamic Page
                </RouterLink>
            </li>
        </ul>
    </header>
);
