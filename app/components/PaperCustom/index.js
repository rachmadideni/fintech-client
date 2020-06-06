/**
 *
 * PaperCustom
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(props => (
  <Paper
    classes={{
      rounded: 'rounded',
    }}
    {...props}
  />
))`
  &.rounded {
    border-radius: 12px;
    padding: 15px 20px 20px 20px;
  }
`;

const PaperCustom = props => {
  return <StyledPaper {...props} />;
};

// PaperCustom.propTypes = {};

export default PaperCustom;
