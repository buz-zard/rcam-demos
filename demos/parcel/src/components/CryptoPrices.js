import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-cached-api-middleware';

import CurrencySwitcher from './CurrencySwitcher';
import CryptoCard from './CryptoCard';

class CryptoPrices extends React.Component {
  componentDidMount() {
    const { fetchCoinData } = this.props;
    fetchCoinData();
    this.interval = setInterval(fetchCoinData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      data: { btc, eth, xrp, ltc },
    } = this.props;
    return (
      <div className="my-5 overflow-x-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="mx-2">Cryptocurrencies</h2>
          <CurrencySwitcher />
        </div>
        <div className="flex flex-wrap my-3">
          <CryptoCard data={btc} name="Bitcoin" />
          <CryptoCard data={eth} name="Ethereum" />
          <CryptoCard data={xrp} name="XRP" />
          <CryptoCard data={ltc} name="Litecoin" />
        </div>
        <div className="mx-2 my-6">
          <div>
            <b>Note:</b> Cryptocurrency values are powered by{' '}
            <a
              href="https://www.cryptonator.com/api/"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              cryptonator API
            </a>
            .
          </div>
        </div>
      </div>
    );
  }
}

CryptoPrices.propTypes = {
  fetchCoinData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    btc: PropTypes.shape({}),
    eth: PropTypes.shape({}),
    xrp: PropTypes.shape({}),
    ltc: PropTypes.shape({}),
  }).isRequired,
};

const API_BASE_URL = 'https://api.cryptonator.com/api/';
const BTC_URL = `${API_BASE_URL}ticker/btc-usd`;
const BTC_CACHE_KEY = 'GET/ticker/btc-usd';
const ETH_URL = `${API_BASE_URL}ticker/eth-usd`;
const ETH_CACHE_KEY = 'GET/ticker/eth-usd';
const XRP_URL = `${API_BASE_URL}ticker/xrp-usd`;
const XRP_CACHE_KEY = 'GET/xrp-usd';
const LTC_URL = `${API_BASE_URL}ticker/ltc-usd`;
const LTC_CACHE_KEY = 'GET/ltc-usd';

const enhance = connect(
  state => ({
    data: {
      btc: api.selectors.getResult(state, BTC_CACHE_KEY),
      eth: api.selectors.getResult(state, ETH_CACHE_KEY),
      xrp: api.selectors.getResult(state, XRP_CACHE_KEY),
      ltc: api.selectors.getResult(state, LTC_CACHE_KEY),
    },
  }),
  dispatch => ({
    dispatch,
    fetchCoinData: () => {
      const fetchCoinData = (url, cacheKey) =>
        dispatch(
          api.actions.invoke({
            endpoint: url,
            cache: { key: cacheKey }, // Will use default cache strategy
          })
        );

      fetchCoinData(BTC_URL, BTC_CACHE_KEY);
      fetchCoinData(ETH_URL, ETH_CACHE_KEY);
      fetchCoinData(XRP_URL, XRP_CACHE_KEY);
      fetchCoinData(LTC_URL, LTC_CACHE_KEY);
    },
  })
);

export default enhance(CryptoPrices);
