import { Input as AntInput } from 'antd';
import { styled } from 'styled-components';

const size = {
  small: '25%',
  large: '100%',
};

export const CustomInput = styled(AntInput)`
  width: ${({ width }) => (width ? size[width as keyof typeof size] : '50%')};
`;
