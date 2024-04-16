import { styled } from '@mui/material';

type Props = {
  keyType: string;
};

const Container = styled('button', { name: 'keyboard__key' })`
  background: #44a4a4;
  border-radius: 6px;
  border: none;
  font-size: 24px;
  grid-area: ${({ keyType }: Props) => keyType};
  color: white;
  cursor: pointer;
  transition: 400ms;

  &:hover {
    background: rgba(68, 164, 164, 0.59);
  }
`;

export default Container;
