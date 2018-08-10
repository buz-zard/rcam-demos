import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from 'redux-cached-api-middleware';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import RepositoryList from './RepositoryList';

const styles = theme => ({
  card: {
    width: '60%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
  },
  textField: {
    width: '100%',
  },
});

class RepositorySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'buz-zard',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { userName } = this.state;
    const { fetchUserData } = this.props;
    fetchUserData(userName);
  }

  handleSubmit(event) {
    const { fetchUserData } = this.props;
    event.preventDefault();
    const userName = event.target.text.value;
    this.setState({ userName });
    fetchUserData(userName);
  }

  render() {
    const { getResult, classes } = this.props;
    const { userName } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <TextField
              name="text"
              label="Type in GutHub user name and press ENTER"
              defaultValue={userName}
              margin="normal"
              className={classes.textField}
            />
          </form>
          {userName && <RepositoryList data={getResult(userName)} />}
        </Card>
      </div>
    );
  }
}

RepositorySearch.propTypes = {
  getResult: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const enhance = connect(
  state => ({
    getResult: userName => api.selectors.getResult(state, userName),
  }),
  dispatch => ({
    fetchUserData(userName) {
      return dispatch(
        api.actions.invoke({
          endpoint: `https://api.github.com/users/${userName}/repos`,
          cache: { key: userName },
        })
      );
    },
  })
);

export default withStyles(styles)(enhance(RepositorySearch));
