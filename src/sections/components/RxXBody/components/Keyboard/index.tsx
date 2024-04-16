import React from 'react';
import CalculatorButton from '../../../../../components/CalculatorButton';
import useCalculator from "@sections/components/RxXBody/useCalculator";
import keys, {operators} from "@sections/CONSTS";

const Keyboard = () => {
    const {useWindowType, useCurrentValue, actions} = useCalculator();

    const [windowType] = useWindowType().useState();
    const setValue = useCurrentValue().setState;
    const {appendDigit, appendOperation, calculate} = actions;

    const handleClearValue = () => setValue('0');

    if (windowType === 'history') {
        return <></>;
    }

    return (
        <div className="keyboard">
            {keys.map(({type, value, label}) => (
                <CalculatorButton
                    key={type}
                    keyType={type}
                    onClick={() => appendDigit(value)}
                >
                    {label}
                </CalculatorButton>
            ))}
            {operators.map(({type, value, label}) => (
                <CalculatorButton
                    key={type}
                    keyType={type}
                    onClick={() => appendOperation(value)}
                >
                    {label}
                </CalculatorButton>
            ))}
            <CalculatorButton keyType={'clear'} onClick={handleClearValue}>
                AC
            </CalculatorButton>
            <CalculatorButton keyType={'equals'} onClick={calculate}>
                =
            </CalculatorButton>
        </div>
    );
};

export default Keyboard;
