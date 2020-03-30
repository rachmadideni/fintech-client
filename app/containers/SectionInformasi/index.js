/**
 *
 * SectionInformasi
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSectionInformasi from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function SectionInformasi() {
  useInjectReducer({ key: 'sectionInformasi', reducer });
  useInjectSaga({ key: 'sectionInformasi', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SectionInformasi.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
