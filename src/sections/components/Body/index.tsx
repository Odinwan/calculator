import { useObserver } from 'mobx-react-lite';
import React from 'react';

import calculatorStore from '../../context/CalculatorStore';
import Actions from './components/Actions';
import Keyboard from './components/Keyboard';
import Window from './components/Window';
import Container from './StyledComponents';

const Body = () => {
  return useObserver(() => {
    const { windowType } = calculatorStore;

    return (
      <Container isHistory={windowType === 'history'}>
        <Window />
        <Actions />
        <Keyboard />
      </Container>
    );
  });
};

export default Body;
