import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-cached-api-middleware';

import Spinner from './Spinner';
import Articles from './Articles';

const CACHE_KEY = 'GET/hacker-news/top';

class App extends React.Component {
  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }

  render() {
    const { result } = this.props;
    if (result && result.fetched) {
      const { fetching, error, successPayload } = result;
      return (
        <div className="content">
          {fetching && <Spinner small />}
          {!fetching && error && <div className="error">An error occurred</div>}
          {successPayload && <Articles items={successPayload.articles} />}
        </div>
      );
    }
    return <Spinner />;
  }
}

const enhance = connect(
  state => ({
    result: api.selectors.getResult(state, CACHE_KEY),
  }),
  dispatch => ({
    requestData() {
      return dispatch(
        api.actions.invoke({
          method: 'GET',
          headers: {
            Accept: 'application/json; charset=utf-8',
            'x-api-Key': process.env.REACT_APP_API_KEY,
          },
          endpoint: 'https://newsapi.org/v2/top-headlines?sources=hacker-news',
          cache: {
            key: CACHE_KEY,
            strategy: api.cache
              .get(api.constants.CACHE_TYPES.TTL_SUCCESS)
              .buildStrategy({ ttl: 600000 }), // 10 minutes
          },
        })
      );
    },
  })
);

App.propTypes = {
  result: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    timestamp: PropTypes.number,
    successPayload: PropTypes.any,
    errorPayload: PropTypes.any,
  }),
  requestData: PropTypes.func.isRequired,
};

export default enhance(App);
