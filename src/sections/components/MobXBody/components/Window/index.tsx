import calculatorStore from '@sections/components/MobXBody/CalculatorStore';
import { useObserver } from 'mobx-react-lite';
import React from 'react';

const Window = () => {
  return useObserver(() => {
    const { windowType, history, current } = calculatorStore;

    return (
      <div className="window">
        {windowType === 'history' && (
          <div className={'history'}>
            {[...history]
              .sort((a, b) => a.index - b.index)
              .map((entry, index) => (
                <div key={index}>
                  {entry.formula} = <span>{entry.result}</span>
                </div>
              ))}
          </div>
        )}
        {windowType === 'calculator' && (
          <>
            <div className={'history'}>
              {[...history]
                .sort((a, b) => a.index - b.index)
                .reverse()
                .slice(0, 5)
                .map((entry, index) => (
                  <div key={index}>
                    {entry.formula} = <span>{entry.result}</span>
                  </div>
                ))}
            </div>
            <div className={'current'}>{current}</div>
          </>
        )}
      </div>
    );
  });
};

export default Window;
