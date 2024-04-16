import {styled} from '@mui/material';

type BodyProps = {
    isHistory: boolean
}

const Container = styled('div', {name: 'body__calculator'})`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({isHistory}: BodyProps) => isHistory ? '1fr max-content' : '1fr max-content 1fr'};
  gap: ${({isHistory}: BodyProps) => isHistory ? '0' : '20px'};

  .window {
    color: white;
    background: #616B79;
    margin: 20px 20px 0 20px;
    border-radius: 20px;
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: flex-end;
    overflow: scroll;
    -webkit-box-shadow: 0px 14px 24px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 14px 24px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 14px 24px -3px rgba(0, 0, 0, 0.75);

    .history {
      display: grid;
      gap: 10px;
      overflow-x: scroll;
      text-align: right;
      padding: 10px 0;
      
      span {
        color: #32D99C;
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
    grid-template-areas: 'clear clear clear division'
  'seven eight nine multiplication'
  'four five six subtraction'
  'one two three addition'
  'nil nil point equals';
    gap: 5px;
  }

  .key {
    background: #44A4A4;
    border-radius: 6px;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: 400ms;

    &:hover {
      background: rgba(68, 164, 164, 0.59);
    }
  }

  .key-clear {
    grid-area: clear
  }

  .key-nine {
    grid-area: nine
  }

  .key-eight {
    grid-area: eight
  }

  .key-seven {
    grid-area: seven
  }

  .key-six {
    grid-area: six
  }

  .key-five {
    grid-area: five
  }

  .key-four {
    grid-area: four
  }

  .key-three {
    grid-area: three
  }


  .key-two {
    grid-area: two
  }


  .key-one {
    grid-area: one
  }

  .key-nil {
    grid-area: nil
  }

  .key-addition {
    grid-area: addition
  }

  .key-subtraction {
    grid-area: subtraction
  }

  .key-multiplication {
    grid-area: multiplication
  }

  .key-division {
    grid-area: division
  }

  .key-point {
    grid-area: point
  }

  .key-equals {
    grid-area: equals;
  }
`;


export default Container;