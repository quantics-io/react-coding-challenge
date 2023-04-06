import { Dropdown } from "./Dropdown";
import s from './SelectBox.module.scss';
import { ForecastRunDto } from "./models";

interface SelectBoxProps {
    title: string,
    values: ForecastRunDto[],
    selected?: ForecastRunDto,
    onChange: (val: ForecastRunDto) => void

}

const SelectBox = ({ title, values, selected, onChange }: SelectBoxProps) => {
    return (
        <div className={s.selectBox}>
            <span>{title}:</span>
            <Dropdown
                values={values}
                selected={selected}
                onChange={onChange}
            />
        </div>
    );

}

export default SelectBox;