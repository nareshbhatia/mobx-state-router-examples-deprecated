import React from 'react';
import { inject, observer } from 'mobx-react';
import { LoadingWrapper, TitleLink } from '../components';
import './github-page.css';

const GitHubPage = inject('rootStore')(
    observer(({ rootStore }) => (
        <LoadingWrapper loadingState={rootStore.repoStore.loadingState}>
            <div className="content">
                <h1 className="title">Top JavaScript Repos</h1>
                <ul className="repo-list">
                    {rootStore.repoStore.repos.map(repo => (
                        <li key={repo.node_id}>
                            <Repo repo={repo} />
                        </li>
                    ))}
                </ul>
            </div>
        </LoadingWrapper>
    ))
);

const Repo = ({ repo }) => (
    <React.Fragment>
        <TitleLink href={repo.html_url}>{repo.name}</TitleLink>
        <p>{repo.description}</p>
        <p className="repo-stats">
            <em>
                {repo.language}, {repo.forks} forks, {repo.stargazers_count}{' '}
                stars
            </em>
        </p>
    </React.Fragment>
);

export default GitHubPage;
