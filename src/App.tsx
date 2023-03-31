import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import './default.scss';
import Layout from './Components/Layout';
import ProvideForecasts from './Components/ProvideForecasts';



function App() {

  return (
    <ProvideForecasts>
      <Layout>
        <div>Forecasts are loaded</div>
      </Layout>
    </ProvideForecasts>
  );
}

export default App;
