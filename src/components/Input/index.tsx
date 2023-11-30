import { InputProps } from 'antd';
import { CustomInput } from './styles';

function Input({ ...props }: InputProps) {
  return <CustomInput allowClear {...props} />;
}

export default Input;
