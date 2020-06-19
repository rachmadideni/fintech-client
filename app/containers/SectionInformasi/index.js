/**
 *
 * SectionInformasi
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeSelectSectionInformasi from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SectionInformasi() {
  useInjectReducer({ key: 'sectionInformasi', reducer });
  useInjectSaga({ key: 'sectionInformasi', saga });

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: 'pink',
        width: '100%',
      }}
    >
      <Grid item style={{ width: '100%' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Customer Services
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          supporting@afs.co.id
        </Typography>
      </Grid>
    </Grid>
  );
}

SectionInformasi.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sectionInformasi: makeSelectSectionInformasi(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionInformasi);
