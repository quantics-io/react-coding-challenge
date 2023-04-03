import { FormControl, MenuItem, Select } from "@mui/material";
import { FC, memo, useCallback } from 'react';
import s from './Dropdown.module.scss';
import { ForecastRunDto } from "./models";

type DropdownProps = {
  values: ForecastRunDto[];
  selected?: ForecastRunDto;
  onChange: (fc: ForecastRunDto) => void;
};

export const Dropdown: FC<DropdownProps> = memo(function Dropdown({ values, selected, onChange }) {

  const handleChange = useCallback((id: string) => {
    console.info('Dropdown change:', id)

    const next = values.find((it) => it.id === id);
    next && id !== selected?.id && onChange(next);
  }, [values, selected?.id, onChange]);

  return (
    <FormControl className={s.formControl} variant="standard">
      <Select className={s.select} variant="outlined" value={selected ? selected.id : ''}
        onChange={(it) => handleChange(it.target.value)}>
        {values.map(it => <MenuItem id={s.menuItem} key={it.id} value={it.id}>{it.name}</MenuItem>)}
      </Select>
    </FormControl>
  );
});