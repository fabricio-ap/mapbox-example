import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { CustomTable, Wrapper } from './styles';

interface DataType {
  [key: string]: string | number;
}

function Table({ columns, data }: { columns: ColumnsType<DataType>; data: DataType[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  const dataSource = data.map((item, index) => ({ ...item, key: index }));

  useEffect(() => {
    if (ref.current) {
      const node = ref.current;
      const { height } = node.getBoundingClientRect();
      setSize(height - 55 - 48);
    }
  }, []);

  return (
    <Wrapper ref={ref}>
      {size && (
        <CustomTable
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content', y: size }}
          size='middle'
        />
      )}
    </Wrapper>
  );
}

export default Table;
