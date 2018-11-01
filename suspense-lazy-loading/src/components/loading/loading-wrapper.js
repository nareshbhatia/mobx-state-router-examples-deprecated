import React from 'react';
import { observer } from 'mobx-react';

export const LoadingWrapper = observer(({ loadingState, children }) => {
    const { loading, error } = loadingState;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return <React.Fragment>{children}</React.Fragment>;
});
