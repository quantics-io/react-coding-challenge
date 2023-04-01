import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import SelectUnit from './SelectBox';
import { ForecastRunDto } from './models';
import { filterForCorrectType, fitSourceFc } from './utils';
import SelectBox from './SelectBox';
import { Dropdown } from './Dropdown';
import WithSource from './WithSource';

function App() {
  const [forecasts, setForecasts] = useState<ForecastRunDto[] | null>(null);
  const [sourceForecast, setSourceForecast] = useState<ForecastRunDto | undefined>(undefined);
  const [targetForecast, setTargetForecast] = useState<ForecastRunDto | undefined>(undefined);

  useEffect(() => {
    const fetchForecasts = async () => {
      const res: Response = await fetch("forecastruns.json");
      const forecastData: any = await res.json();

      const typeSafeForecastData: ForecastRunDto[] = filterForCorrectType(forecastData);

      setForecasts(
        typeSafeForecastData
      );
    }

    fetchForecasts();
  }, []);

  useEffect(() => setTargetForecast(undefined), [sourceForecast]);

  if (forecasts) {
    if (forecasts.length === 0)
      return <div>We couldn't find any forecasts.</div>
    return (
      <Layout>
        <>
          <SelectBox title={'Source'}>
            <Dropdown values={forecasts} selected={sourceForecast}
              onChange={(val: ForecastRunDto) => setSourceForecast(val)} />
          </SelectBox>
          <WithSource sourceForecast={sourceForecast}>
            <SelectBox title={'Target'}>
              <Dropdown values={fitSourceFc(forecasts, sourceForecast)} selected={targetForecast}
                onChange={(val: ForecastRunDto) => setTargetForecast(val)} />
            </SelectBox>
          </WithSource>
        </>
      </Layout>
    );
  }
  return <div>Forecasts are loadig.</div>
}

export default App;
