export type TPanel = {
  data: { [key: string]: string | number }[];
  filter: number;
  isLoading: boolean;
  onChangeFilter: (value: number | string | null) => void;
};
