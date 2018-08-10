import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import cx from 'classnames';
import api from 'redux-cached-api-middleware';

import { EXCHANGE_RATES_CACHE_KEY } from '../constants';

class CryptoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: Date.now(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getPrice = value => {
    const { currency, exchangeRates } = this.props;
    const num = typeof value === 'string' ? Number(value) : value;
    if (!this.canConvertCurrency()) return value;
    return num * exchangeRates.rates[currency];
  };

  getCurrencySymbol = () => {
    const { currency } = this.props;
    if (!this.canConvertCurrency()) return '$';
    return { USD: '$', EUR: '€' }[currency] || currency;
  };

  canConvertCurrency = () => {
    const { currency, exchangeRates } = this.props;
    return exchangeRates && exchangeRates.rates[currency] != null;
  };

  render() {
    const { name, data } = this.props;
    const { now } = this.state;

    if (!data) return null;

    if (data.successPayload && data.successPayload.success) {
      const { price, change } = data.successPayload.ticker;
      const changeNumber = Number(change);
      return (
        <div className="inline-block border-2 border-grey rounded py-2 px-3 m-2 flex-grow">
          <h3 className="pl-4">
            {name}{' '}
            {data.fetching && <div className="loader inline-block ml-1" />}
          </h3>
          <div className="my-1 ml-4">
            {this.getCurrencySymbol()} {this.getPrice(price).toFixed(6)}
          </div>
          <div className="mb-2">
            <span
              className={cx({
                'text-green': changeNumber > 0,
                'text-red': changeNumber < 0,
                'text-grey': changeNumber === 0,
              })}
            >
              {changeNumber > 0 && '↑'}
              {changeNumber < 0 && '↓'} {this.getCurrencySymbol()}{' '}
              {this.getPrice(Math.abs(changeNumber)).toFixed(6)}
            </span>
            <span className="text-grey text-xs pl-2">(last hour change)</span>
          </div>
          <div className="text-grey text-xs pl-4">
            Updated {distanceInWordsStrict(data.timestamp, now)} ago
          </div>
        </div>
      );
    }

    if (data.fetching) {
      return (
        <div className="inline-block border-2 border-grey rounded py-2 px-3 m-2 flex-grow bg-grey-lightest">
          <h3>{name}</h3>
          <div className="mt-1 mb-2">
            <div className="loader inline-block ml-1" />
          </div>
        </div>
      );
    }

    if (data.error || (data.successPayload && !data.successPayload.success)) {
      return (
        <div className="inline-block border-2 border-red rounded py-2 px-3 m-2 flex-grow bg-red-lightest">
          <h3>{name}</h3>
          <div className="mt-1 mb-2">Error occurred while fetching</div>
        </div>
      );
    }

    return null;
  }
}

CryptoCard.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
  currency: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape({}),
};

const enhance = connect(state => ({
  currency: state.app.currency,
  exchangeRates: (
    api.selectors.getResult(state, EXCHANGE_RATES_CACHE_KEY) || {}
  ).successPayload,
}));

export default enhance(CryptoCard);
