import { styled } from '@mui/material';

const Container = styled('div', { name: 'calculator' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #e5e5e5;

  .calculator {
    background: #1d2c40;
    border-radius: 30px;
    width: 390px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    .header {
      background: #44648e;
      width: 100%;
      height: 30px;
    }

    .footer {
      background: #44648e;
      width: 100%;
      height: 30px;
    }
  }
`;

export default Container;
