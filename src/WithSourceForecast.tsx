import { ReactElement } from "react";
import { ForecastRunDto } from "./models";

interface WithSourceForecastProps {
    sourceForecast: ForecastRunDto | undefined
    children: ReactElement
}

const WithSourceForecast = ({ sourceForecast, children }: WithSourceForecastProps) => {

    if (sourceForecast)
        return (children);
    return (<></>);
}

export default WithSourceForecast;