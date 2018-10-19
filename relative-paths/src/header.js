import React from 'react';
import { RouterLink } from 'mobx-state-router';
import './header.css';

export const Header = () => (
    <header>
        <ul>
            <li>
                <RouterLink routeName="home">Home</RouterLink>
            </li>
            <li>
                <RouterLink routeName="about">About</RouterLink>
            </li>
        </ul>
    </header>
);
