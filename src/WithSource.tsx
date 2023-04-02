import { Children, ReactElement } from "react";
import { ForecastRunDto } from "./models";

interface WithSourceProps {
    sourceForecast: ForecastRunDto | undefined
    children: ReactElement
}

const WithSource = ({ sourceForecast, children }: WithSourceProps) => {

    if (sourceForecast)
        return (<>{children}</>);
    return (<></>);
}

export default WithSource;