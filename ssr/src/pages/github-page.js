import React from 'react';
import { inject, observer } from 'mobx-react';
import { TitleLink } from '../components';
import './github-page.css';

export const GitHubPage = inject('rootStore')(
    observer(({ rootStore }) => (
        <div className="content">
            <h1 className="title">Top JavaScript Repos</h1>
            <ul className="repo-list">
                {rootStore.repoStore.repos.map(repo => (
                    <li key={repo.node_id} className="title-link">
                        <TitleLink href={repo.html_url}>{repo.name}</TitleLink>
                        <p>{repo.description}</p>
                        <p className="repo-stats">
                            <em>
                                {repo.language}, {repo.forks} forks,{' '}
                                {repo.stargazers_count} stars
                            </em>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    ))
);
