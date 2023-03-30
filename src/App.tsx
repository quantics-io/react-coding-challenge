import React, { useEffect, useState } from 'react';
import s from './App.module.scss';

function App() {

  const [forecasts, setForecasts] = useState([]);
  useEffect(() => {
    fetch("forecastruns.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setForecasts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);



  return (<div>Implement me</div>);
}

export default App;
