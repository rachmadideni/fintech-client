/**
 *
 * AuthGuard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
// import { getTokenAuthFromStorage } from 'containers/Login/helpers';
import { makeSelectAuthToken } from '../App/selectors';

const AuthGuard = props => {
  if (!props.token) {
    return <Redirect to="/login" />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

AuthGuard.propTypes = {
  token: PropTypes.string,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectAuthToken(),
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
)(AuthGuard);
