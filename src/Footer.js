import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    padding: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

function Footer({ classes }) {
  return (
    <footer className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography align="center">
            A{' '}
            <a
              href="https://www.npmjs.com/package/redux-cached-api-middleware"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              redux-cached-api-middleware
            </a>{' '}
            demo application -{' '}
            <a
              href="https://github.com/buz-zard/rcam-demos"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              source code
            </a>
            .
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Copyright ©{' '}
            <a
              href="https://karolis.sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Karolis Šarapnickis
            </a>
            , {new Date().getFullYear()}. MIT Licensed.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
