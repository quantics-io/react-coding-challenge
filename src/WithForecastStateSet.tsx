import { ReactElement } from "react";
import { ForecastRunDto } from "./models";

interface WithForecastStateSetProps {
    value: ForecastRunDto | undefined
    children: ReactElement
}

const WithForecastStateSet = ({ value, children }: WithForecastStateSetProps) => {

    if (value)
        return (children);
    return (<></>);
}

export default WithForecastStateSet;