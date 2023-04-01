import { Children, ReactElement } from "react";
import { IForecast } from "./models";

interface SelectBoxProps {
    title: string
    children: ReactElement
}

const SelectBox = ({ title, children }: SelectBoxProps) => {
    return (
        <div>
            <div>{title}</div>
            {children}
        </div>
    );

}

export default SelectBox;