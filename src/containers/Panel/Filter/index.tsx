import { DollarCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Input from '~/components/Input';
import NumberInput from '~/components/NumberInput';
import { FilterContainer } from './styles';
import { TFilter } from './types';

function Filter({ filter, onChangeSearch, onChangeBalance }: TFilter) {
  const { search, balance } = filter;

  return (
    <FilterContainer>
      <Input
        placeholder='Pesquisar'
        value={search}
        onChange={onChangeSearch}
        prefix={<SearchOutlined />}
      />
      <NumberInput
        defaultValue={balance}
        value={balance}
        onChange={onChangeBalance}
        prefix={<DollarCircleOutlined />}
      />
    </FilterContainer>
  );
}

export default Filter;
