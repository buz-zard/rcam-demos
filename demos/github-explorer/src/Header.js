import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  flex: {
    flexGrow: 1,
  },
};

function Header({ classes }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Live-coins
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            localStorage.clear();
            window.location.reload(true);
          }}
        >
          Restart app
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
