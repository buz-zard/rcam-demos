import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CoinCard from './CoinCard';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  info: {
    padding: theme.spacing.unit * 2,
  },
});

function Coins({ classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <CoinCard url="ticker/btc-usd" name="Bitcoin" />
        <CoinCard url="ticker/eth-usd" name="Ether" />
        <CoinCard url="ticker/xrp-usd" name="XRP" />
        <CoinCard url="ticker/ltc-usd" name="Litecoin" />
      </Grid>
      <div className={classes.info}>
        <Typography>* Prices are updated every 30 seconds</Typography>
      </div>
    </div>
  );
}

Coins.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Coins);
