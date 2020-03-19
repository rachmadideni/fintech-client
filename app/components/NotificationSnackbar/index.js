/**
 *
 * NotificationSnackbar
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import { color, typography } from '../../styles/constants';

function NotificationSnackbar(props) {
  const { open, onClose, message, hideDuration, verticalPos, ...otherProps } = props;
  return (
    <Snackbar 
      anchorOrigin={{
        vertical:verticalPos,
        horizontal:'left'
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={hideDuration}
      message={<span>{message}</span>}
      {...otherProps}
      style={{
        fontFamily:typography.fontFamily,
        fontSize:10,
        // backgroundColor:color.green
      }}
    />
  );
}

NotificationSnackbar.propTypes = {};

export default NotificationSnackbar;
