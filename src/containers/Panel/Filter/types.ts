import { ChangeEvent } from 'react';

export type TFilter = {
  filter: {
    search: string;
    balance: number;
  };
  onChangeSearch: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangeBalance: (value: number | string | null) => void;
};
