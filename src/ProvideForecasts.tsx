import React, { ReactChildren, ReactElement, ReactNode, useEffect, useState } from "react";

interface Period {
    start: Date
    end: Date
}

interface IForecast {
    name: string
    period: Period
};

function isForecast(fc: any): fc is IForecast {
    return fc.hasOwnProperty('name')
        && fc.hasOwnProperty('period')
        && fc.period.hasOwnProperty('start')
        && fc.period.hasOwnProperty('end')
        && typeof fc.name === 'string'
        && new Date(fc.period.start) instanceof Date
        && new Date(fc.period.end) instanceof Date;
}

interface ProvideForecastsProps {
    children: ReactElement
}

const ProvideForecasts = ({ children }: ProvideForecastsProps) => {


    const [forecasts, setForecasts] = useState<IForecast[] | null>(null);
    const getForecasts = async () => {
        const res: Response = await fetch("forecastruns.json");
        const forecastData: any = await res.json();
        const typeSafeForecastData: IForecast[] = [];

        for (let i = 0; i < forecastData.length; i++) {
            if (forecastData[i] && isForecast(forecastData[i])) {
                typeSafeForecastData.push(forecastData[i]);
            }
        }
        setForecasts([...typeSafeForecastData]);
    }

    useEffect(() => {
        getForecasts();
    }, []);

    console.log('forecasts', forecasts);

    if (forecasts) {
        if (forecasts.length === 0)
            return <div>We couldn't find any forecasts.</div>
        return (children);
    }
    return <div>Forecasts are loadig.</div>



}

export default ProvideForecasts;