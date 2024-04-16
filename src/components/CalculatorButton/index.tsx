import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import Container from './StyledComponents';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  keyType: string;
  children: React.ReactNode;
}

const CalculatorButton = (props: Props) => {
  const { keyType, children, ...otherProps } = props;
  return (
    <Container keyType={keyType} {...otherProps}>
      {children}
    </Container>
  );
};

export default CalculatorButton;
