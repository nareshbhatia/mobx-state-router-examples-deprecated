import React from 'react';
import { observer } from 'mobx-react';
import { CenteredMessage } from '..';

export const LoadingWrapper = observer(({ loadingState, children }) => {
    const { name, loading, error } = loadingState;

    if (loading) {
        return <CenteredMessage>Loading {name}</CenteredMessage>;
    }

    if (error) {
        return <CenteredMessage>{error.message}</CenteredMessage>;
    }

    return <React.Fragment>{children}</React.Fragment>;
});
