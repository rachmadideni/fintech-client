/**
 *
 * ForgotPassword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForgotPassword, {
  makeSelectUserStatus,
  makeSelectErrorMessage,
  makeSelectSuccessMessage,
  makeSelectIsLoading,
  makeSelectKodeReset,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { color, typography } from 'styles/constants';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Mail } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { Wrapper, AppTitle } from '../Verifikasi/components';
import PaperCustom from 'components/PaperCustom';
import BtnCustom from 'components/BtnCustom';
import NotificationSnackbar from 'components/NotificationSnackbar';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { cekNikDanEmail, logSuccessMessage } from './actions';

const styles = makeStyles(() => ({
  header: {
    fontFamily: typography.fontFamily,
    fontWeight: 'bold',
    color: color.subtleBlack,
  },
}));

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nik: '',
      email: '',
      kodeReset:'',
      error: {
        nik: null,
        email: null,
        kodeReset: null
      },
      isSubmitTriggered: false,
      openNotification: false,
      openSuccessNotification: false,
    };
  }

  toggleNotification = (state, stateValue) => {
    this.setState({
      [state]: stateValue,
    });
  };

  componentDidUpdate(prevProps) {
    if (!!this.props.errorMessage && prevProps.errorMessage === null) {
      console.log('1');
      this.toggleNotification('openNotification', true);
    } else if (!!prevProps.errorMessage && this.props.errorMessage === null) {
      console.log('2');
      this.toggleNotification('openNotification', false);
    }

    if (!!this.props.successMessage && prevProps.successMessage === null) {
      console.log('3');
      this.toggleNotification('openSuccessNotification', true);
    } else if (
      !!prevProps.successMessage &&
      this.props.successMessage === null
    ) {
      console.log('4');
      this.toggleNotification('openSuccessNotification', false);
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

  validateEmail = email => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if (isEmpty(email)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyEmail);
    } else if (!isEmail(email)) {
      isError = true;
      errorMsg = intl.formatMessage(messages.wrongEmailFormat);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        email: errorMsg,
      },
    }));
    return !isError;
  };

  validateKodeReset = () => {
    const { intl, kodeResetDariReduxState } = this.props;
    const { kodeReset } = this.state;
    let isError = false;
    let errorMsg = null;
    if(isEmpty(kodeReset)){
      isError = true;
      errorMsg = intl.formatMessage(messages.kodeResetKosong)
    } else if(kodeReset !== kodeResetDariReduxState){
      isError = true;
      errorMsg = intl.formatMessage(messages.kodeResetTidakSama)
    } else if(kodeReset == kodeResetDariReduxState){
      isError = false;
      errorMsg = null;
    }

    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        kodeReset: errorMsg,
      },
    }));
    return !isError;

  }

  changeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState(state => ({
      ...state,
      isSubmitTriggered: true,
    }));

    if (
      this.validateNik(this.state.nik) &&
      this.validateEmail(this.state.email)
    ) {
      console.log('valid on the UI!');
      this.props.cekNikDanEmail(this.state.nik, this.state.email);
    }
    return false;
  };

  render() {
    const { intl } = this.props;
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
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            marginTop: -30,
            marginBottom:20,
            padding: 10,
            width:'50%',
            border:'solid 2px white',
            borderRadius:8
          }}
        >
          <Typography
            variant="subtitle2"
            align="center"
            style={{
              color: 'white',
            }}
          >
            Kode reset
          </Typography>
          <Typography
            variant="h4"
            align="center"
            style={{
              color: 'black',
              fontWeight:'bold',
              letterSpacing:4
            }}
          >
            10adfr
          </Typography>
        </div> */}
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <NotificationSnackbar
            verticalPos="top"
            open={this.state.openNotification}
            onClose={() => this.toggleNotification('openNotification', false)}
            hideDuration={3000}
            message={this.props.errorMessage}
            notificationType="warning"
          />

          <NotificationSnackbar
            verticalPos="top"
            open={this.state.openSuccessNotification}
            onClose={() => this.props.logSuccessMsg(null)}
            hideDuration={3000}
            message={this.props.successMessage}
            notificationType="success"
          />

          <PaperCustom
            elevation={0}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <form autoComplete="off">
              <Typography variant="h6" align="left" className={styles.header}>
                {intl.formatMessage(messages.header)}
              </Typography>
              <Typography
                color="inherit"
                align="left"
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: color.subtleBlack,
                }}
              >
                {intl.formatMessage(messages.HeaderWelcomeMessage)}
              </Typography>

              <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                dsakdja
              </Grid>

              <TextField
                type="text"
                label={intl.formatMessage(messages.nik)}
                value={this.state.nik}
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!this.state.error.nik}
                helperText={this.state.error.nik}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validateNik(evt.target.value);
                  }
                  return this.changeInput('nik', evt.target.value);
                }}
              />

              <TextField
                type="text"
                label={intl.formatMessage(messages.email)}
                value={this.state.email}
                fullWidth
                variant="outlined"
                margin="dense"
                error={!!this.state.error.email}
                helperText={this.state.error.email}
                onChange={evt => {
                  if (this.state.isSubmitTriggered) {
                    this.validateEmail(evt.target.value);
                  }
                  return this.changeInput('email', evt.target.value);
                }}
              />

              {this.props.kodeResetDariReduxState && (
                <React.Fragment>
                  {JSON.stringify(this.state.kodeReset)}
                  {JSON.stringify(this.state.error.kodeReset)}
                  <TextField
                    type="text"
                    label={intl.formatMessage(messages.resetCode)}
                    value={this.state.kodeReset}
                    inputProps={{ maxLength:6 }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    error={!!this.state.error.kodeReset}
                    helperText={this.state.error.kodeReset}
                    onChange={evt=>{
                      if(this.state.kodeReset.length === 5){
                        // console.log(this.state.kodeReset.length)
                        this.validateKodeReset();
                      }
                      return this.changeInput('kodeReset', evt.target.value);
                    }}
                  />

                  <TextField
                    type="new_password"
                    label={intl.formatMessage(messages.newPassword)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </React.Fragment>
              )}

              <BtnCustom
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                title={intl.formatMessage(messages.resetButton)}
                startIcon={
                  this.props.isLoading ? (
                    <CircularProgress size={20} style={{ color: 'white' }} />
                  ) : null
                }
              />
            </form>
          </PaperCustom>
        </Box>
      </Wrapper>
    );
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgotPassword: makeSelectForgotPassword(),
  userStatus: makeSelectUserStatus(),
  errorMessage: makeSelectErrorMessage(),
  successMessage: makeSelectSuccessMessage(),
  isLoading: makeSelectIsLoading(),
  kodeResetDariReduxState: makeSelectKodeReset(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cekNikDanEmail: (nik, email) => dispatch(cekNikDanEmail(nik, email)),
    logSuccessMsg: message => dispatch(logSuccessMessage(message)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'forgotPassword', reducer }),
  injectSaga({ key: 'forgotPassword', saga }),
  injectIntl,
  memo,
)(ForgotPassword);
