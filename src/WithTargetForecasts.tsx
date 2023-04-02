import { Children, ReactElement } from "react";
import { ForecastRunDto } from "./models";
import s from './WithTargetForecasts.module.scss';

interface WithTargetForecastsProps {
    targetForecasts: ForecastRunDto[]
    sourceForecast: ForecastRunDto | undefined
    children: ReactElement
}

const WithTargetForecasts = ({ targetForecasts, sourceForecast, children }: WithTargetForecastsProps) => {

    if (targetForecasts.length > 0)
        return (children);
    return (
        <h3 className={s.warning}>No matches found for Forecast Run <u>{`${sourceForecast?.name}`}</u></h3>);
}

export default WithTargetForecasts;