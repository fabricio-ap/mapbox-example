import { styled } from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;

  height: 64px;
  width: 100%;
  padding: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  box-shadow: 0px 0px 1px 0px #000000;

  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
`;

export const Title = styled.h4`
  padding: 0px;
`;
