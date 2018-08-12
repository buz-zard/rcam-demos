import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function RepositoryList({ data }) {
  if (!data) return null;
  if (data.fetching) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '1rem 0',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (data.error) {
    return (
      <div className="bg-white rounded p-2">
        <Typography color="error">Error occurred</Typography>
        <div style={{ whiteSpace: 'pre' }}>
          {JSON.stringify(data.errorPayload, null, 2)}
        </div>
      </div>
    );
  }
  if (data.successPayload) {
    return (
      <List className="bg-white rounded p-2">
        {!data.successPayload.length && 'No repositories'}
        {data.successPayload.map(item => (
          <React.Fragment key={item.id}>
            <Divider />
            <ListItem>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography gutterBottom color="primary">
                    {item.name}
                  </Typography>
                  <Typography variant="caption">
                    {new Date(Date.parse(item.created_at)).toLocaleDateString()}
                  </Typography>
                </div>
                <Typography gutterBottom color="textSecondary">
                  {item.description}
                </Typography>
                <Button href={item.html_url}>{item.html_url}</Button>
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    );
  }
  return null;
}

RepositoryList.propTypes = {
  data: PropTypes.shape({}),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepositoryList);
