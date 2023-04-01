import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import SelectUnit from './SelectBox';
import { ForecastRunDto } from './models';
import { filterForCorrectType } from './utils';
import SelectBox from './SelectBox';
import { Dropdown } from './Dropdown';



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

  if (forecasts) {
    if (forecasts.length === 0)
      return <div>We couldn't find any forecasts.</div>
    return (
      <Layout>
        <>
          <div>Forecasts are loaded</div>
          <SelectBox title={'Source'}>
            <Dropdown values={forecasts} selected={sourceForecast}
              onChange={(val: ForecastRunDto) => setSourceForecast(val)} />
          </SelectBox>
        </>
      </Layout>
    );
  }
  return <div>Forecasts are loadig.</div>
}

export default App;
