import React from 'react';
import api from 'redux-cached-api-middleware';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Coins from './Coins';
import Footer from './Footer';

export const init = () => {
  api.config.DEFAULT_INVOKE_OPTIONS = {
    method: 'GET',
    headers: { Accept: 'application/json' },
  };
  api.config.DEFAULT_CACHE_STRATEGY = api.cache
    .get(api.constants.CACHE_TYPES.TTL)
    .buildStrategy({ ttl: 30 * 1000 }); // 30 seconds
};

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      <Header />
      <div style={{ flex: 1 }}>
        <Coins />
      </div>
      <Footer />
    </div>
  );
}

export default App;
