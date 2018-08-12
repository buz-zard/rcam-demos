import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-cached-api-middleware';
import cx from 'classnames';

import * as actions from '../state/actions';
import { EXCHANGE_RATES_CACHE_KEY } from '../constants';

class CurrencySwitcher extends React.Component {
  componentDidMount() {
    const { fetchRates } = this.props;
    fetchRates();
  }

  render() {
    const { currency, changeCurrency } = this.props;
    return (
      <div className="px-4">
        <button
          type="button"
          className={cx('btn mr-2', currency === 'USD' && 'btn--disabled')}
          onClick={() => changeCurrency('USD')}
          disabled={currency === 'USD'}
        >
          USD
        </button>
        <button
          type="button"
          className={cx('btn', currency === 'EUR' && 'btn--disabled')}
          onClick={() => changeCurrency('EUR')}
          disabled={currency === 'EUR'}
        >
          EUR
        </button>
      </div>
    );
  }
}

CurrencySwitcher.propTypes = {
  currency: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
};

const enhance = connect(
  state => ({ currency: state.app.currency }),
  dispatch => ({
    dispatch,
    changeCurrency: payload => dispatch(actions.changeCurrency(payload)),
    fetchRates: () =>
      dispatch(
        api.actions.invoke({
          endpoint: 'https://exchangeratesapi.io/api/latest?base=USD',
          cache: {
            key: EXCHANGE_RATES_CACHE_KEY,
            // Will override default cache strategy
            strategy: api.cache
              .get(api.constants.CACHE_TYPES.TTL_SUCCESS)
              .buildStrategy({ ttl: 60 * 60 * 60 * 1000 }), // 1 hour
          },
        })
      ),
  })
);

export default enhance(CurrencySwitcher);
