import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components';

// Component styles
import styles from './styles';

class DropComponent extends Component {

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel
            subtitle= "Drop"
            title="Camera"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
        
        </PortletContent>
      </Portlet>
    );
  }
}

DropComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropComponent);
