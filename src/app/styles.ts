import { styled } from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 64px);
  padding: 40px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;
