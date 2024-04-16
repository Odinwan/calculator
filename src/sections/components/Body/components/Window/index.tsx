import React from 'react';
import Container from "./StyledComponents";
import {useObserver} from 'mobx-react-lite';
import HistoryIcon from '@mui/icons-material/History';
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalculatorButton from "../../../components/CalculatorButton";
import keys, {operators} from "./CONSTS";
import calculatorStore from "../../context/CalculatorStore";

const Body = () => {

    return useObserver(() => {

        const {windowType, history, current} = calculatorStore;
        const toolTipTypeText = windowType === 'calculator' ? 'История' : 'Калькулятор';

        return (
            <Container isHistory={windowType === 'history'}>
                <div className="window">
                    {windowType === 'history' && (
                        <div className={'history'}>
                            {[...history].sort(((a, b) => a.index - b.index)).map((entry, index) => (
                                <div key={index}>{entry.formula} = <span>{entry.result}</span></div>
                            ))}
                        </div>
                    )}
                    {windowType === 'calculator' && (
                        <>
                            <div className={'history'}>
                                {[...history].sort(((a, b) => a.index - b.index)).reverse().slice(0, 5).map((entry, index) => (
                                    <div key={index}>{entry.formula} = <span>{entry.result}</span></div>
                                ))}
                            </div>
                            <div className={'current'}>{current}</div>
                        </>
                    )}
                </div>
                <div className="actions">
                    <Tooltip title={toolTipTypeText}>
                        <IconButton size={'large'} onClick={() => calculatorStore.switchWindowType()}
                        >
                            {windowType === 'calculator' && (<HistoryIcon/>)}
                            {windowType === 'history' && (<CalculateIcon/>)}
                        </IconButton>
                    </Tooltip>
                    {windowType === 'calculator' && (
                        <Tooltip title={'Удалить'}>
                            <IconButton size={'large'} onClick={() => calculatorStore.deleteLastDigit()}>
                                <BackspaceIcon color={'action'}/>
                            </IconButton>
                        </Tooltip>
                    )}
                    {windowType === 'history' && (
                        <Tooltip title={'Очистить историю'}>
                            <IconButton size={'large'} onClick={() => calculatorStore.clearHistory()}>
                                <DeleteIcon color={'action'}/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                {windowType === 'calculator' && (
                    <div className="keyboard">
                        {keys.map(({type, value, label}) => (
                            <CalculatorButton
                                key={type}
                                keyType={type}
                                onClick={() => calculatorStore.appendDigit(value)}
                            >
                                {label}
                            </CalculatorButton>
                        ))}
                        {operators.map(({type, value, label}) => (
                            <CalculatorButton
                                key={type}
                                keyType={type}
                                onClick={() => calculatorStore.appendOperation(value)}
                            >
                                {label}
                            </CalculatorButton>
                        ))}
                        <CalculatorButton
                            keyType={'clear'}
                            onClick={() => calculatorStore.clear()}
                        >
                            AC
                        </CalculatorButton>
                        <CalculatorButton
                            keyType={'equals'}
                            onClick={() => calculatorStore.calculate()}
                        >
                            =
                        </CalculatorButton>
                    </div>
                )}
            </Container>
        )
    });
}

export default Body;
