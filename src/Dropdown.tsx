import React, { FC, memo, useCallback } from 'react';
import './App.css';
import { ForecastRunDto } from "./models";
import { MenuItem, Select } from "@mui/material";
import s from './Dropdown.module.scss'

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

  return (<Select className={s.select} value={selected?.id} onChange={(it) => handleChange(it.target.value)}>
    {values.map(it => <MenuItem key={it.id} value={it.id}>{it.name}</MenuItem>)}
  </Select>);
});