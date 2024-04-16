import React from 'react';

import Body from './components/Body';
import Container from './StyledComponents';

const App = () => {
  return (
    <Container>
      <div className="calculator">
        <div className="header" />
        <Body />
        <div className="footer" />
      </div>
    </Container>
  );
};

export default App;
