/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectLogin,
  makeSelectCredential,
  makeSelectError,
  makeSelectIsLoading,
} from './selectors';

import { makeSelectAuthToken } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  resetInputAction,
  changeNikAction,
  changePasswordAction,
  loginAction,
  loginErrorAction,
} from './actions';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Backdrop from '@material-ui/core/Backdrop';

import NotificationSnackbar from 'components/NotificationSnackbar';
import BtnCustom from 'components/BtnCustom';
import PaperCustom from 'components/PaperCustom';

import isEmpty from 'validator/lib/isEmpty';
import { color, typography } from 'styles/constants';

const styles = makeStyles(theme=>({
  textField:{
    fontFamily: typography.fontFamily,
    fontSize: 12,
    backgroundColor: color.grey,
    borderRadius: 4,
    textTransform: 'capitalize',
  }
}))

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdropOpen: false,
      error: {
        nik: null,
        email: null,
        password: null,
      },
      isSubmitTriggered: false,
      isProcessing: false,
      showPassword: false,
      isNotificationOpen: false,
    };
  }

  componentDidMount() {
    this.props.resetInput();
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.errorMessage && prevProps.errorMessage === null) {
      this.setState(state => ({
        ...state,
        isNotificationOpen: true,
      }));
    } else if (!!prevProps.errorMessage && this.props.errorMessage === null) {
      this.setState(state => ({
        ...state,
        isNotificationOpen: false,
      }));
    }
  }

  validateNik = nik => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(nik)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNik);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        nik: errorMsg,
      },
    }));
    return !isError;
  };

  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(password)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyPassword);
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

  handleVerification = () => {
    const { history } = this.props;
    return history.replace('/verifikasi');
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { credential } = this.props;
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateNik(credential.nik) &&
      this.validatePassword(credential.password)
    ) {
      return this.props.login();
    }
    return false;
  };

  handleClickShowPassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword,
    }));
  };

  render() {
    const { intl, credential, changeNik, changePassword, token } = this.props;

    if (token) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Box
        display="flex"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Backdrop
          open={this.props.isLoading}
          style={{
            zIndex: 3000,
            color: color.white,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <PaperCustom elevation={0}>
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
              {intl.formatMessage(messages.HeaderWelcomeMessage)}
            </Typography>

            <TextField
              id="nik"
              name="nik"
              value={credential.nik}
              label={intl.formatMessage(messages.nik)}              
              type="text"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={evt => {
                if (this.state.isSubmitTriggered) {
                  this.validateNik(evt.target.value);
                }
                return changeNik(evt.target.value);
              }}
              error={!!this.state.error.nik}
              helperText={this.state.error.nik}              
              className={styles.textField}
            />

            <TextField
              id="password"
              name="password"
              value={credential.password}
              label={intl.formatMessage(messages.password)}              
              onChange={evt => {
                if (this.state.isSubmitTriggered) {
                  this.validatePassword(evt.target.value);
                }
                return changePassword(evt.target.value);
              }}
              type={this.state.showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="inherit"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility style={{ color: color.black }} />
                      ) : (
                        <VisibilityOff style={{ color: color.grey }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!this.state.error.password}
              helperText={this.state.error.password}
            />

            <BtnCustom
              fullWidth
              variant="contained"
              color="primary"
              disabled={!!this.props.errorMessage}
              onClick={this.handleSubmit}
              title={intl.formatMessage(messages.loginButton)}
            />

            <BtnCustom
              fullWidth
              variant="outlined"
              color="primary"
              onClick={this.handleVerification}
              title={intl.formatMessage(messages.verificationButton)}
            />

            <NotificationSnackbar
              verticalPos="bottom"
              open={this.state.isNotificationOpen}
              onClose={() => this.props.logError(null)}
              hideDuration={3000}
              message={this.props.errorMessage}
            />
          </form>
        </PaperCustom>
      </Box>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  credential: makeSelectCredential(),
  isLoading: makeSelectIsLoading(),
  token: makeSelectAuthToken(),
  errorMessage: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeNik: nik => dispatch(changeNikAction(nik)),
    changePassword: password => dispatch(changePasswordAction(password)),
    login: () => dispatch(loginAction()),
    resetInput: () => dispatch(resetInputAction()),
    logError: error => dispatch(loginErrorAction(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'saga', saga }),
  withConnect,
  injectIntl,
  memo,
)(Login);
