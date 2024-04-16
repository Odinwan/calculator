import calculatorStore from '@sections/components/MobXBody/CalculatorStore';
import keys, { operators } from '@sections/CONSTS';
import { useObserver } from 'mobx-react-lite';
import React from 'react';

import CalculatorButton from '../../../../../components/CalculatorButton';

const Keyboard = () => {
  return useObserver(() => {
    const { windowType } = calculatorStore;

    if (windowType === 'history') {
      return <></>;
    }

    return (
      <div className="keyboard">
        {keys.map(({ type, value, label }) => (
          <CalculatorButton
            key={type}
            keyType={type}
            onClick={() => calculatorStore.appendDigit(value)}
          >
            {label}
          </CalculatorButton>
        ))}
        {operators.map(({ type, value, label }) => (
          <CalculatorButton
            key={type}
            keyType={type}
            onClick={() => calculatorStore.appendOperation(value)}
          >
            {label}
          </CalculatorButton>
        ))}
        <CalculatorButton keyType={'clear'} onClick={() => calculatorStore.clear()}>
          AC
        </CalculatorButton>
        <CalculatorButton keyType={'equals'} onClick={() => calculatorStore.calculate()}>
          =
        </CalculatorButton>
      </div>
    );
  });
};

export default Keyboard;
