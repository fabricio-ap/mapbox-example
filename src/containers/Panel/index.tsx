import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/Loading';
import Table from '~/components/Table';
import { setBalance, setData, setSearch } from '~/reducers/dataReducer';
import type { RootState } from '~/stores';
import Filter from './Filter';
import { CustomTableRow, TableContainer, Wrapper } from './styles';

function Panel() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    filteredData,
    filter: { balance, search },
  } = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const filteredItems = data.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );

    dispatch(setData(filteredItems));
  }, [search]);

  const handleChangeSearch = ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearch(target.value));

  const handleChangeBalance = (value: number | string | null) => dispatch(setBalance(value));

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, feature: { [key: string]: string | number }) =>
        (feature.revenue as number) > balance ? text : <CustomTableRow>{text}</CustomTableRow>,
    },
    {
      title: 'Balanço',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (text: string, feature: { [key: string]: string | number }) =>
        (feature.revenue as number) > balance ? text : <CustomTableRow>{text}</CustomTableRow>,
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
  ];

  return (
    <Wrapper>
      <Filter
        filter={{ search, balance }}
        onChangeSearch={handleChangeSearch}
        onChangeBalance={handleChangeBalance}
      />

      <TableContainer>
        {isLoading && <Loading />}
        {!isLoading && <Table columns={columns} data={filteredData} />}
      </TableContainer>
    </Wrapper>
  );
}

export default Panel;
