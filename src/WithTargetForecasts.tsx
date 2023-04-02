import { Children, ReactElement } from "react";
import { ForecastRunDto } from "./models";
import s from './WithTargetForecasts.module.scss';

interface WithTargetForecastsProps {
    targetForecasts: ForecastRunDto[] | undefined
    sourceForecast: ForecastRunDto | undefined
    children: ReactElement
}

const WithTargetForecasts = ({ targetForecasts, sourceForecast, children }: WithTargetForecastsProps) => {

    if (targetForecasts) {
        if (targetForecasts.length > 0)
            return (children);
        return (
            <span className={s.warning}>No matches found for Forecast Run <u>{`${sourceForecast?.name}`}</u></span>);
    }
    return (<></>);
}

export default WithTargetForecasts;