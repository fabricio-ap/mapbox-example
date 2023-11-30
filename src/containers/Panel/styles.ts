import { styled } from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 24px;

  background-color: ${({ theme }) => theme.onBackground};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const TableContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomTableRow = styled.span`
  color: ${({ theme }) => theme.error};
`;
