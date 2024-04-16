import React from 'react';
import useCalculator from "@sections/components/RxXBody/useCalculator";

const Window = () => {
    const {useWindowType, useHistoryItems, useCurrentValue} = useCalculator();

    const [current] = useCurrentValue().useState();
    const [history] = useHistoryItems().useState();
    const [windowType] = useWindowType().useState();

    return (
        <div className="window">
            {windowType === 'history' && (
                <div className={'history'}>
                    {history
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
                        {history
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
};

export default Window;
