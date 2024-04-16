import BackspaceIcon from '@mui/icons-material/Backspace';
import CalculateIcon from '@mui/icons-material/Calculate';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useObserver } from 'mobx-react-lite';
import React from 'react';

import calculatorStore from '../../../../context/CalculatorStore';

const Actions = () => {
  return useObserver(() => {
    const { windowType } = calculatorStore;
    const toolTipTypeText = windowType === 'calculator' ? 'История' : 'Калькулятор';

    return (
      <div className="actions">
        <Tooltip title={toolTipTypeText}>
          <IconButton size={'large'} onClick={() => calculatorStore.switchWindowType()}>
            {windowType === 'calculator' && <HistoryIcon />}
            {windowType === 'history' && <CalculateIcon />}
          </IconButton>
        </Tooltip>
        {windowType === 'calculator' && (
          <Tooltip title={'Удалить'}>
            <IconButton size={'large'} onClick={() => calculatorStore.deleteLastDigit()}>
              <BackspaceIcon color={'action'} />
            </IconButton>
          </Tooltip>
        )}
        {windowType === 'history' && (
          <Tooltip title={'Очистить историю'}>
            <IconButton size={'large'} onClick={() => calculatorStore.clearHistory()}>
              <DeleteIcon color={'action'} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  });
};

export default Actions;
