import { Children, ReactElement } from "react";
import s from './SelectBox.module.scss';

interface SelectBoxProps {
    title: string
    children: ReactElement
}

const SelectBox = ({ title, children }: SelectBoxProps) => {
    return (
        <div className={s.selectBox}>
            <span>{title}:</span>
            {children}
        </div>
    );

}

export default SelectBox;