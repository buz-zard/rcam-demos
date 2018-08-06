import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-cached-api-middleware';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const BASE_URL = 'https://api.cryptonator.com/api/';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 1,
    marginBottom: 0,
    padding: theme.spacing.unit * 2,
  },
  changeInfo: {
    paddingLeft: theme.spacing.unit * 1,
  },
});

class CoinCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: Date.now(),
    };
  }

  componentDidMount() {
    const { requestData } = this.props;
    requestData();
    this.interval = setInterval(() => {
      requestData();
      this.setState({ now: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data, name, classes } = this.props;
    const { now } = this.state;

    const makeCard = element => (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>{element}</Paper>
      </Grid>
    );

    if (!data) return null;

    if (data.successPayload && data.successPayload.success) {
      const { price, change } = data.successPayload.ticker;
      const changeNumber = Number(change);

      return makeCard(
        <React.Fragment>
          <Typography variant="headline" component="h2" gutterBottom>
            {name} {data.fetching && <CircularProgress size={20} />}
          </Typography>
          <Typography>${price}</Typography>
          <Grid container>
            <Typography
              gutterBottom
              color={changeNumber < 0 ? 'error' : 'primary'}
            >
              {changeNumber > 0 && '↑'}
              {changeNumber < 0 && '↓'} ${Math.abs(changeNumber)}
            </Typography>
            <Typography color="textSecondary" className={classes.changeInfo}>
              (past hour change)
            </Typography>
          </Grid>

          <Typography color="textSecondary">
            Updated {distanceInWordsStrict(data.timestamp, now)} ago
          </Typography>
        </React.Fragment>
      );
    }

    if (data.fetching) {
      return makeCard(
        <React.Fragment>
          <Typography variant="headline" component="h2">
            {name}
          </Typography>
          <CircularProgress size={30} />
        </React.Fragment>
      );
    }

    if (data.error || (data.successPayload && !data.successPayload.success)) {
      return makeCard(
        <React.Fragment>
          <Typography variant="headline" component="h2">
            {name}
          </Typography>
          <Typography color="error">
            An unexpected error has occurred
          </Typography>
        </React.Fragment>
      );
    }

    return null;
  }
}

CoinCard.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  name: PropTypes.string.isRequired,
  requestData: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
};

const enhance = connect(
  (state, { url }) => ({
    data: api.selectors.getResult(state, `GET/${url}`),
  }),
  (dispatch, { url }) => ({
    requestData() {
      dispatch(
        api.actions.invoke({
          endpoint: BASE_URL + url,
          cache: { key: `GET/${url}` },
        })
      );
    },
  })
);

export default withStyles(styles)(enhance(CoinCard));
