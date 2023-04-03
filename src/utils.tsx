import { Dispatch } from "react";
import { ForecastRunDto } from "./models";

export function isForecast(fc: any): fc is ForecastRunDto {
    return (
        fc.hasOwnProperty('id')
        && fc.hasOwnProperty('name')
        && fc.hasOwnProperty('user')
        && fc.user.hasOwnProperty('firstname')
        && fc.user.hasOwnProperty('lastname')
        && fc.user.hasOwnProperty('email')
        && fc.hasOwnProperty('creationDate')
        && fc.hasOwnProperty('period')
        && fc.period.hasOwnProperty('start')
        && fc.period.hasOwnProperty('end')
        && typeof fc.id === 'string'
        && typeof fc.name === 'string'
        && typeof fc.user.firstname === 'string'
        && typeof fc.user.lastname === 'string'
        && typeof fc.user.email === 'string'
        && new Date(fc.creationDate) instanceof Date
        && new Date(fc.period.start) instanceof Date
        && new Date(fc.period.end) instanceof Date
    );
}

export function filterForCorrectType(fc: any): ForecastRunDto[] {
    const typeSafeForecastData: ForecastRunDto[] = [];

    for (let i = 0; i < fc.length; i++) {
        if (fc[i] && isForecast(fc[i])) {
            typeSafeForecastData.push(fc[i]);
        }
    }
    return (typeSafeForecastData);
}

export const overlapWithSourceForecast = (
    forecasts: ForecastRunDto[], sourceForecast: ForecastRunDto | undefined): ForecastRunDto[] => {
    if (sourceForecast) {
        const sFc = sourceForecast;
        return forecasts.filter(tFc => tFc.id !== sFc.id && (
            (                                                                     // {-}: source, [-]:target
                Date.parse(tFc.period.start) >= Date.parse(sFc.period.start) &&     // {--[--}--]
                Date.parse(sFc.period.end) > Date.parse(tFc.period.start)
            )
            ||
            (
                Date.parse(tFc.period.start) <= Date.parse(sFc.period.start) &&     // [--{--]--}
                Date.parse(sFc.period.start) < Date.parse(tFc.period.end)
            )
            // ||
            // (
            //     Date.parse(tFc.period.start) === Date.parse(sFc.period.start) && // [{----}]
            //     Date.parse(tFc.period.end) === Date.parse(sFc.period.end)
            // )
            ||
            (
                Date.parse(tFc.period.start) >= Date.parse(sFc.period.start) &&     // {-[---]-}, [{----}]
                Date.parse(tFc.period.end) <= Date.parse(sFc.period.end)
            )
            ||
            (
                Date.parse(tFc.period.start) < Date.parse(sFc.period.start) &&     // [-{---}-]
                Date.parse(tFc.period.end) > Date.parse(sFc.period.end)
            )
        )
        );
    }
    return forecasts;
}

export const makeCopy = (
    setCopy: Dispatch<string | undefined>, targetForecast?: ForecastRunDto, sourceForecast?: ForecastRunDto
) => {
    if (targetForecast) {
        if (window.confirm(
            `You sure you want to copy from ${sourceForecast?.name} to ${targetForecast?.name}?`) === true
        )
            setCopy(`${sourceForecast?.name} copied to ${targetForecast?.name}`)
    } else {
        window.alert('Select a target forecast first!')
    }
}

