import React from 'react';
import api from 'redux-cached-api-middleware';

import Header from './Header';
import CryptoPrices from './CryptoPrices';
import Footer from './Footer';

export const init = () => {
  api.config.DEFAULT_INVOKE_OPTIONS = {
    method: 'GET',
    headers: { Accept: 'application/json' },
  };
  api.config.DEFAULT_CACHE_STRATEGY = api.cache
    .get(api.constants.CACHE_TYPES.TTL)
    .buildStrategy({ ttl: 30 * 1000 }); // 10 minutes
};

function App() {
  return (
    <div className="flex flex-col h-full overflow-hidden overflow-y-auto">
      <Header />
      <div className="container mx-auto flex-1">
        <CryptoPrices />
      </div>
      <Footer />
    </div>
  );
}

export default App;
