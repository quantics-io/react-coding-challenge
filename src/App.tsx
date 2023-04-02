import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import CopyForm from './CopyForm';
import SelectUnit from './SelectBox';
import { ForecastRunDto } from './models';
import { filterForCorrectType, fitSourceFc } from './utils';
import SelectBox from './SelectBox';
import { Dropdown } from './Dropdown';
import WithSource from './WithSource';
import { Button } from '@mui/material';
import s from 'App.module.scss';
import InfoScreen from './InfoScreen';
import WithTargetForecasts from './WithTargetForecasts';

function App() {
  const [forecasts, setForecasts] = useState<ForecastRunDto[] | null>(null);
  const [sourceForecast, setSourceForecast] = useState<ForecastRunDto | undefined>(undefined);
  const [targetForecast, setTargetForecast] = useState<ForecastRunDto | undefined>(undefined);
  const [targetForecasts, setTargetForecasts] = useState<ForecastRunDto[]>([]);
  const [copy, setCopy] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchForecasts = async () => {
      const res: Response = await fetch("forecastruns.json");
      const forecastData: any = await res.json();

      const typeSafeForecastData: ForecastRunDto[] = filterForCorrectType(forecastData);

      setTimeout(() => {
        setForecasts(
          typeSafeForecastData
        );
      }, 1000);
    }

    fetchForecasts();
  }, []);

  useEffect(() => {
    setTargetForecast(undefined);
    if (forecasts)
      setTargetForecasts([...fitSourceFc(forecasts, sourceForecast)])
  },
    [sourceForecast]);

  const handleCopy = () => {
    if (targetForecast)
      if (window.confirm(`You sure you want to copy from ${sourceForecast?.name} to ${targetForecast?.name}?`) === true)
        setCopy(`${sourceForecast?.name} copied to ${targetForecast?.name}`);
  }

  if (forecasts) {
    if (forecasts.length < 2)
      return <InfoScreen><><p>We couldn't find enough forecasts. 🧐</p><p>Contact the provider.</p></></InfoScreen>
    if (copy)
      return <InfoScreen><><p>Copy complete 🚀</p><p>Press F5 to refresh and copy again.</p></></InfoScreen>
    return (
      <CopyForm>
        <>
          <SelectBox title={'Source'}>
            <Dropdown values={forecasts} selected={sourceForecast}
              onChange={(val: ForecastRunDto) => setSourceForecast(val)} />
          </SelectBox>
          <WithSource sourceForecast={sourceForecast}>
            <>
              <WithTargetForecasts targetForecasts={targetForecasts} sourceForecast={sourceForecast}>
                <>
                  <SelectBox title={'Target'}>
                    <Dropdown values={targetForecasts as ForecastRunDto[]} selected={targetForecast}
                      onChange={(val: ForecastRunDto) => setTargetForecast(val)} />
                  </SelectBox>
                  <Button onClick={handleCopy} variant="contained">Copy</Button>
                </>
              </WithTargetForecasts>
            </>
          </WithSource>
        </>
      </CopyForm>
    );
  }
  return <InfoScreen><p>Forecasts are collected from storage. 📦 Please wait.</p></InfoScreen>
}

export default App;
