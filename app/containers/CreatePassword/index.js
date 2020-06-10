/**
 *
 * CreatePassword
 *
 */

import React, { memo } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import isEmpty from 'validator/lib/isEmpty';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import PaperCustom from 'components/PaperCustom';
import BtnCustom from 'components/BtnCustom';
import { Wrapper, AppTitle } from '../Verifikasi/components';
import {
  changePasswordAction,
  changePasswordConfirmAction,
  submitPasswordAction,
} from './actions';
import { color, typography } from '../../styles/constants';
import messages from './messages';
import {
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectError,
} from './selectors';
import saga from './saga';
import reducer from './reducer';

class CreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        password: null,
        password_confirm: null,
      },
      isSubmitTriggered: false,
    };
  }

  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(password)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        password: errorMsg,
      },
    }));
    return !isError;
  };

  validatePasswordConfirm = passwordConfirm => {
    const { intl, password } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(passwordConfirm)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password_confirm);
    } else if (password !== passwordConfirm) {
      isError = true;
      errorMsg = intl.formatMessage(messages.password_confirm_not_match);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        password_confirm: errorMsg,
      },
    }));
    return !isError;
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { password, passwordConfirm } = this.props;
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validatePassword(password) &&
      this.validatePasswordConfirm(passwordConfirm)
    ) {
      return this.props.submitPassword();
    }
    return false;
  };

  render() {
    const {
      intl,
      changePassword,
      changePasswordConfirm,
      password,
      passwordConfirm,
    } = this.props;
    return (
      <Wrapper container wrap="nowrap" direction="column">
        <AppBar
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Toolbar style={{ justifyContent: 'center' }}>
            <AppTitle gutterBottom>
              {intl.formatMessage(messages.appTitle)}
            </AppTitle>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          width="100%"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <PaperCustom
            elevation={0}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <form autoComplete="off">
              <Typography
                variant="h6"
                color="primary"
                align="left"
                style={{
                  fontFamily: typography.fontFamily,
                  fontWeight: 'bold',
                  color: color.subtleBlack,
                }}
              >
                {intl.formatMessage(messages.header)}
              </Typography>
              <Typography
                color="inherit"
                align="left"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 11,
                  fontWeight: 'normal',
                  color: color.subtleBlack,
                }}
              >
                {intl.formatMessage(messages.subtitle)}
              </Typography>

              <TextField
                id="password"
                name="password"
                label="password"
                type="text"
                fullWidth
                variant="outlined"
                margin="dense"
                value={password}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validatePassword(evt.target.value);
                  }
                  return changePassword(evt.target.value);
                }}
                error={!!this.state.error.password}
                helperText={this.state.error.password}
              />

              <TextField
                id="konfirmasi_password"
                name="konfirmasi_password"
                label="konfirm password"
                type="text"
                fullWidth
                variant="outlined"
                margin="dense"
                value={passwordConfirm}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validatePasswordConfirm(evt.target.value);
                  }
                  return changePasswordConfirm(evt.target.value);
                }}
                error={!!this.state.error.password_confirm}
                helperText={this.state.error.password_confirm}
              />

              <BtnCustom
                fullWidth
                variant="contained"
                color="primary"
                disabled={!!this.props.errorMessage}
                onClick={this.handleSubmit}
                title={intl.formatMessage(messages.buatPassword)}
              />
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

CreatePassword.propTypes = {
  intl: PropTypes.object,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func,
  changePasswordConfirm: PropTypes.func,
  submitPassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  passwordConfirm: makeSelectPasswordConfirm(),
  errorMessage: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: data => dispatch(changePasswordAction(data)),
    changePasswordConfirm: data => dispatch(changePasswordConfirmAction(data)),
    submitPassword: () => dispatch(submitPasswordAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'createPassword', reducer }),
  injectSaga({ key: 'createPasswordSaga', saga }),
  injectIntl,
  memo,
)(CreatePassword);
