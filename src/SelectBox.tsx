import { Children, ReactElement } from "react";

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