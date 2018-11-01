import React from 'react';
import { observer } from 'mobx-react';
import { CenteredContainer, Headline } from '..';

export const LoadingWrapper = observer(({ loadingState, children }) => {
    const { loading, error } = loadingState;

    if (loading) {
        return (
            <CenteredContainer>
                <Headline>Loading...</Headline>
            </CenteredContainer>
        );
    }

    if (error) {
        return (
            <CenteredContainer>
                <Headline>{error.message}</Headline>
            </CenteredContainer>
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
});
