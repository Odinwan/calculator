import { styled } from '@mui/material';

type BodyProps = {
  isHistory: boolean;
};

const Container = styled('div', { name: 'body__calculator' })`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ isHistory }: BodyProps) =>
    isHistory ? '1fr max-content' : '1fr max-content 1fr'};
  gap: ${({ isHistory }: BodyProps) => (isHistory ? '0' : '20px')};

  .window {
    color: white;
    background: #616b79;
    margin: 20px 20px 0 20px;
    border-radius: 20px;
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: flex-end;
    overflow: scroll;
    -webkit-box-shadow: 0 14px 24px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0 14px 24px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 0 14px 24px -3px rgba(0, 0, 0, 0.75);

    .history {
      display: grid;
      gap: 10px;
      overflow-x: scroll;
      text-align: right;
      padding: 10px 0;

      span {
        color: #32d99c;
      }
    }

    .current {
      padding: 10px 0 0 0;
      border-top: 1px solid black;
      text-align: right;
    }
  }

  .actions {
    padding: 0 20px;
    display: grid;
    grid-template-columns: 48px 48px;
    justify-content: space-between;

    svg {
      fill: white;
    }

    .Mui-disabled {
      svg {
        fill: rgba(255, 255, 255, 0.32);
      }
    }
  }

  .keyboard {
    display: grid;
    padding: 5px;
    grid-template-areas:
      'clear clear clear division'
      'seven eight nine multiplication'
      'four five six subtraction'
      'one two three addition'
      'nil nil point equals';
    gap: 5px;
  }
`;

export default Container;
