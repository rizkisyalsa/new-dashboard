import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  DragComponent,
  DropComponent
} from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '110%'
  }
});

class TollTrx extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Toll Transaction">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              md={12}
              xl={3}
              xs={12}
            >
              <DragComponent className={classes.item} />
            </Grid>
            <Grid
              item
              lg={9}
              md={12}
              xl={9}
              xs={12}
            >
              <DropComponent className={classes.item} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

TollTrx.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TollTrx);
