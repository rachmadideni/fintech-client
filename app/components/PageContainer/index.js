/**
 *
 * PageContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const GridWrapper = styled(Grid)`
&& {
  display:flex;
  min-height:100%;
  height:100%;
  align-items:stretch;
}`;

function PageContainer(props) {
  return (
    <GridWrapper {...props}>
      {props.children}
    </GridWrapper>
  );
}

// PageContainer.propTypes = {};

export default PageContainer;
