import React, { useState, useCallback } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import update from 'immutability-helper';
import clsx from "clsx";

// Material helpers
import { withStyles } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ItemTypes from '../../common/ItemTypes';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { DragComponent, DropComponent } from './components';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    marginLeft: "50px",
    marginRight: "50px"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  fixedHeight: {
    height: "100%"
  }
}));

const Dashboard = props => {
  const { classes } = props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null },
    { accepts: [ItemTypes.COMPONENTS], lastDroppedItem: null }
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.COMPONENTS },
    { name: 'Banana', type: ItemTypes.COMPONENTS },
    { name: 'Magazine', type: ItemTypes.COMPONENTS }
  ]);

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  const handleCancelDrop = useCallback(
    (index, item) => {
      let { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $unshift: [] } : { $unshift: [name] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: null
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <DashboardLayout title="Dashboard">
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <Portlet className={classNames(classes.root, classes.item)}>
              {boxes.map(({ name, type }, index) => (
                <DragComponent
                  name={name}
                  type={type}
                  isDropped={isDropped(name)}
                  key={index}
                />
              ))}
            </Portlet>
          </Grid>
          <Grid item lg={9} md={9} xl={9} xs={12}>
            <Portlet className={classNames(classes.root, classes.item)}>
              {dustbins.map(({ accepts, lastDroppedItem }, index) => (
                <DropComponent
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={item => handleDrop(index, item)}
                  key={index}
                  onCancel={item => handleCancelDrop(index, item)}
                />
              ))}
            </Portlet>
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
