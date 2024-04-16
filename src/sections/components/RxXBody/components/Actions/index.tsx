import BackspaceIcon from '@mui/icons-material/Backspace';
import CalculateIcon from '@mui/icons-material/Calculate';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import {Tooltip} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import useCalculator from "@sections/components/RxXBody/useCalculator";

const Actions = () => {
    const {useWindowType, useHistoryItems, actions} = useCalculator();
    const [windowType] = useWindowType().useState();
    const setHistory = useHistoryItems().setState;
    const {switchWindowType, deleteLastDigit} = actions;

    const toolTipTypeText = windowType === 'calculator' ? 'История' : 'Калькулятор';
    const handleClearHistory = () => setHistory([]);

    return (
        <div className="actions">
            <Tooltip title={toolTipTypeText}>
                <IconButton size={'large'} onClick={switchWindowType}>
                    {windowType === 'calculator' && <HistoryIcon/>}
                    {windowType === 'history' && <CalculateIcon/>}
                </IconButton>
            </Tooltip>
            {windowType === 'calculator' && (
                <Tooltip title={'Удалить'}>
                    <IconButton size={'large'} onClick={deleteLastDigit}>
                        <BackspaceIcon color={'action'}/>
                    </IconButton>
                </Tooltip>
            )}
            {windowType === 'history' && (
                <Tooltip title={'Очистить историю'}>
                    <IconButton size={'large'} onClick={handleClearHistory}>
                        <DeleteIcon color={'action'}/>
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

export default Actions;
