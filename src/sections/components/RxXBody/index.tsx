import React from 'react';

import Actions from './components/Actions';
import Keyboard from './components/Keyboard';
import Window from './components/Window';
import Container from './StyledComponents';
import useCalculator from "@sections/components/RxXBody/useCalculator";

const RxBody = () => {
    const [windowType] = useCalculator().useWindowType().useState();

    return (
        <Container isHistory={windowType === 'history'}>
            <Window />
            <Actions />
            <Keyboard />
        </Container>
    );
};

export default RxBody;
