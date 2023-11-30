import { InputNumberProps } from 'antd';
import { CustomInput } from './styles';

type TNumberInput = InputNumberProps & {
  width?: 'small' | 'large';
};

function NumberInput({ width, ...props }: TNumberInput) {
  return <CustomInput width={width} {...props} />;
}

export default NumberInput;
