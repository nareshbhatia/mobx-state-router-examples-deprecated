import React from 'react';
import './title-link.css';

export const TitleLink = ({ children, ...others }) => (
    <h3 className="title-link">
        <a className="title-link__link" {...others}>
            {children}
        </a>
    </h3>
);
