import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CopyForm from './CopyForm';
import sCopyForm from './CopyForm.module.scss';
import { Dropdown } from './Dropdown';
import InfoScreen from './InfoScreen';
import SelectBox from './SelectBox';
import WithSource from './WithSource';
import WithTargetForecasts from './WithTargetForecasts';
import { ErrorMessages, ForecastRunDto } from './models';
import { filterForCorrectType, fitSourceFc, makeCopy } from './utils';

function App() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages[]>([]);
  const [forecasts, setForecasts] = useState<ForecastRunDto[] | undefined>();
  const [sourceForecast, setSourceForecast] = useState<ForecastRunDto | undefined>();
  const [targetForecast, setTargetForecast] = useState<ForecastRunDto | undefined>();
  const [targetForecasts, setTargetForecasts] = useState<ForecastRunDto[] | undefined>();
  const [copy, setCopy] = useState<string | undefined>();

  useEffect(() => {
    setErrorMessages([]);
    const fetchForecasts = async () => {

      const res = await fetch("forecastruns.json");

      let forecastData: any = null;
      try {
        forecastData = await res?.json()
      } catch {
        console.error('No file with valid JSON format at the location!');
        setErrorMessages([...errorMessages, ErrorMessages.NoValidJsonAtLocation]);
      }

      const typeSafeForecastData: ForecastRunDto[] = filterForCorrectType(forecastData);

      if (typeSafeForecastData.length < 2)
        setErrorMessages([...errorMessages, ErrorMessages.NotEnoughForecasts]);

      setTimeout(() => {
        setForecasts(
          typeSafeForecastData
        );
      }, 500);
    }

    fetchForecasts();
  }, []);


  useEffect(() => {
    setTargetForecast(undefined);
    if (forecasts)
      setTargetForecasts([...fitSourceFc(forecasts, sourceForecast)])
  },
    [sourceForecast]);

  if (errorMessages[0] === ErrorMessages.NoValidJsonAtLocation)
    return <InfoScreen><><p>Fetched file is not in JSON format or there is even no file at all. 🤨</p><p>Contact the provider.</p></></InfoScreen>
  if (forecasts) {
    if (errorMessages[0] === ErrorMessages.NotEnoughForecasts)
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
                  <div className={sCopyForm.positionButton}>
                    <Button
                      className={sCopyForm.button}
                      onClick={() => makeCopy(setCopy, targetForecast, sourceForecast)}
                      variant="contained"
                    >Copy</Button>
                  </div>
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
