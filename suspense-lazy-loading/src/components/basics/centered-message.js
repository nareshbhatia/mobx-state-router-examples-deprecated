import React from 'react';
import { observer } from 'mobx-react';
import { CenteredContainer, Headline } from '..';

export const CenteredMessage = observer(({ children }) => {
    return (
        <CenteredContainer>
            <Headline>{children}</Headline>
        </CenteredContainer>
    );
});
