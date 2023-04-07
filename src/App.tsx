import { useEffect, useState } from 'react';
import { CopyForm } from './CopyForm';
import InfoScreen from './InfoScreen';
import { ErrorMessages, ForecastRunDto } from './models';
import { filterForCorrectType } from './utils';

function App() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages[]>([]);
  const [forecasts, setForecasts] = useState<ForecastRunDto[] | undefined>();
  const [copy, setCopy] = useState<Boolean>(false);

  useEffect(() => {
    fetch("forecastruns.json")
      .then
      (
        res => {
          return res.json();
        },
        () => {
          console.log("fetching of data failed");
          setForecasts([]);
        }
      )
      .then
      (
        json => {
          const typeSafeForecastData: ForecastRunDto[] = filterForCorrectType(json);
          if (typeSafeForecastData.length < 2) {
            setErrorMessages([...errorMessages, ErrorMessages.NotEnoughForecasts]);
          } else {
            setTimeout(() => {
              setForecasts(typeSafeForecastData);
            }, 500);
          }
        },
        () => {
          console.log('no JSON format');
          setErrorMessages([...errorMessages, ErrorMessages.NoValidJsonAtLocation]);
          setForecasts([]);
        }
      )
  }, []);

  if (errorMessages[0] === ErrorMessages.NoValidJsonAtLocation)
    return <InfoScreen
      title='Fetched file is not in JSON format or maybe there is even no file at all. 🤨'
      subTitle='Contact the provider.'
    />
  if (errorMessages[0] === ErrorMessages.NotEnoughForecasts)
    return <InfoScreen
      title="We couldn't find enough forecasts. 🧐"
      subTitle="Contact the provider."
    />
  if (forecasts) {
    if (copy)
      return <InfoScreen
        title='Copy complete 🚀'
        subTitle='Press F5 to refresh and copy again.'
      />
    return (
      <CopyForm data={forecasts} onCopyFinished={() => setCopy(true)} />
    );
  }
  return <InfoScreen
    title="Forecasts are collected from storage. 📦 Please wait."
  />
}

export default App;
