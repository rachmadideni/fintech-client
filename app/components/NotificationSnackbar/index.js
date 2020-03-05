/**
 *
 * NotificationSnackbar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import { color, typography } from '../../styles/constants';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function NotificationSnackbar(props) {
  const { open, onClose, message, hideDuration,...otherProps } = props;
  return (
    <Snackbar 
      anchorOrigin={{
        vertical:'bottom',
        horizontal:'left'
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={hideDuration}
      message={<span>{message}</span>}
      {...otherProps}
      style={{
        fontFamily:typography.fontFamily,
        fontSize:10
      }}
    />
  );
}

NotificationSnackbar.propTypes = {};

export default NotificationSnackbar;
