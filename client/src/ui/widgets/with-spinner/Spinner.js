import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './withSpinner.styles';

const Spinner = () => (
    <SpinnerOverlay>
        <SpinnerContainer />
    </SpinnerOverlay>
);

export default Spinner;