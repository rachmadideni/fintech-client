/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
  makeSelectIsLoading } from './selectors';

import {
  makeSelectAuthToken
} from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  resetInputAction,
  changeNikAction, 
  changePasswordAction,
  loginAction,
  loginErrorAction
} from './actions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import isEmpty from 'validator/lib/isEmpty';
import NotificationSnackbar from 'components/NotificationSnackbar';

import styled from 'styled-components';
import { color, typography } from 'styles/constants';
import bggreen01 from '../../images/bg_green_1.png';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrapper = styled(Grid)`
&& {
  flex:1;
  padding-top:100px;
  position: relative;
  background-image: url(${bggreen01});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  justify-content:center;
  align-items:center;
  padding-left:25px;
  padding-right:25px;
  opacity: 0.9;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color:${color.lightGrey};
    // background-image: linear-gradient(to right, ${color.lightGrey} 100%, ${color.lightGrey} 40%);
    opacity: 1;
  }  
}`;

// hal 387
const LoginButton = styled(Button)`
&& {
  margin-top:10px;
  font-family:${typography.fontFamily}; 
  font-weight:bold;
  text-transform:capitalize;
  box-shadow:none;
}`;

// hal 436
const ResetPasswordButton = styled(Button)`
  && {
    font-family:${typography.fontFamily};
    text-transform:capitalize;
    margin-top:0pz;
  }
`;

// hal 459
const VerificationButton = styled(Button)`
  && {
    font-family:${typography.fontFamily};
    font-weight:bold;
    text-transform:capitalize;
    margin-top:0px;
  }
`;

const AppTitle = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:16px;
  font-weight:bold;
  color:${color.white};
  text-transform:capitalize;
}
`;

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backdropOpen:false,      
      error:{
        nik:null,
        email:null,
        password:null
      },
      isSubmitTriggered:false,
      isProcessing:false,
      showPassword:false,
      isNotificationOpen:false
    }
  }

  componentDidMount(){
    this.props.resetInput();
  }

  componentDidUpdate(prevProps){
    if(!!this.props.errorMessage && prevProps.errorMessage === null){
      this.setState(state=>({
        ...state,
        isNotificationOpen:true
      }));
    } else if(!!prevProps.errorMessage && this.props.errorMessage === null){
      this.setState(state=>({
        ...state,
        isNotificationOpen:false
      }));
    }
  }  
  
  validateNik = nik => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if(isEmpty(nik)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNik);
    } else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        nik:errorMsg
      }
    }));
    return !isError;
  }

  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if(isEmpty(password)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyPassword);
    } else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        password:errorMsg
      }
    }));
    return !isError;
  }

  handleVerification = () => {
    const { history } = this.props;
    return history.replace('/verifikasi');
  }
  
  handleSubmit = evt => {
    evt.preventDefault();
    const { credential } = this.props;
    this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(this.validateNik(credential.nik) && this.validatePassword(credential.password)){
      return this.props.login();
    }
    return false;
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ 
      showPassword: !state.showPassword 
    }));
  };

  render(){
    const { 
      intl, 
      credential,      
      changeNik,
      changePassword,
      token 
    } = this.props;

    if(token){
      return <Redirect to="/dashboard" />;
    }

    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column">
          <AppBar 
            style={{
              backgroundColor:'transparent',
              boxShadow:'none'
          }}>
            <Toolbar>
              <div style={{ flexGrow:1 }} />              
              <AppTitle gutterBottom>
                pembiayaan Amanah
              </AppTitle>
              <div style={{ flexGrow:1 }} />
            </Toolbar>
          </AppBar>
          
          <Backdrop 
            open={this.props.isLoading}            
            style={{
              zIndex:3000,
              color:color.white
            }}>
              <CircularProgress color="inherit" />
          </Backdrop>
          
          <Grid 
            item xs>
              <Grid 
                container 
                wrap="nowrap"
                direction="column"
                justify="flex-start"
                style={{
                  justifyContent:'flex-start',
                  alignItems:'flex-start'
                }}>
                  <Paper
                    ref={ paper => this.paperElement = paper}
                    elevation={0} 
                    style={{
                      borderRadius:12,
                      paddingTop:15, 
                      paddingLeft:20, 
                      paddingRight:20,
                      paddingBottom:20,
                       }}>              
                    <Grid 
                      item 
                      xs 
                      style={{ 
                        justifyContent:'center',
                        alignItems:'center'
                      }}>

                      <form 
                        autoComplete="off">

                        <Grid 
                          container 
                          wrap="nowrap" 
                          direction="column"
                          justify="center"
                          alignItems="center">
                          
                          <Grid 
                            item 
                            style={{ 
                              // flex:1,
                              // marginTop:100,
                              // backgroundColor:'transparent'
                            }}>

                            <Typography 
                              variant="h6"
                              color="primary"
                              align="left"                              
                              style={{
                                fontFamily:typography.fontFamily,
                                fontWeight:'bold',
                                color:color.subtleBlack,
                              }}>
                                {intl.formatMessage(messages.header)}                    
                            </Typography>
                            <Typography                                 
                                color="inherit"
                                align="left"                                
                                style={{
                                  fontFamily:typography.fontFamily,
                                  fontSize:11,
                                  fontWeight:'normal',
                                  color:color.subtleBlack                                  
                                }}>
                                pastikan akun anda sudah terverifikasi sebelumnya  
                            </Typography>

                            <div style={{ marginTop:20 }} />
                          
                            <FormControl 
                              margin="dense" 
                              fullWidth>
                              <TextField 
                                id="nik" 
                                name="nik"
                                value={credential.nik} 
                                label={intl.formatMessage(messages.nik)}
                                style={{ 
                                  fontFamily:typography.fontFamily,
                                  textTransform:'capitalize' }}
                                type="text"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                onChange={evt=>{
                                  if(this.state.isSubmitTriggered){
                                    this.validateNik(evt.target.value);
                                  }
                                  return changeNik(evt.target.value)
                                }}
                                error={!!this.state.error.nik}
                                helperText={this.state.error.nik}
                                style={{
                                  fontFamily:typography.fontFamily,
                                  fontSize:12,
                                  backgroundColor:color.white,
                                  borderRadius:4,
                                  textTransform:'capitalize'                                        
                                }} />
                            </FormControl>
                            <FormControl 
                              margin="dense" 
                              fullWidth>
                              <TextField 
                                id="password" 
                                name="password" 
                                value={credential.password}
                                label={intl.formatMessage(messages.password)}
                                style={{
                                  fontFamily:typography.fontFamily,
                                  fontSize:12,
                                  backgroundColor:color.white,
                                  borderRadius:4,
                                  textTransform:'capitalize'                                        
                                }}
                                onChange={evt=>{
                                  if(this.state.isSubmitTriggered){
                                    this.validatePassword(evt.target.value);
                                  }
                                  return changePassword(evt.target.value);
                                }}                 
                                type={this.state.showPassword ? 'text' : 'password'} 
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                InputProps={{
                                  endAdornment:(
                                    <InputAdornment position="end">
                                      <IconButton 
                                        color="inherit"
                                        onClick={this.handleClickShowPassword}>
                                        {
                                          this.state.showPassword ? (
                                            <Visibility style={{ color:color.black }} />
                                          ) : (
                                            <VisibilityOff style={{ color:color.grey }} />
                                          )
                                        }
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                                error={!!this.state.error.password}
                                helperText={this.state.error.password} />
                            </FormControl>
                            
                            <LoginButton
                              fullWidth 
                              variant="contained" 
                              color="primary"
                              disabled={!!this.props.errorMessage}
                              onClick={this.handleSubmit}>
                                {intl.formatMessage(messages.loginButton)}
                            </LoginButton>
                            
                            <div style={{ flexGrow:1, marginTop:20 }} />
                            
                            {/* <Typography 
                              align="center"
                              gutterBottom 
                              style={{
                                fontFamily:typography.fontFamily,
                                fontSize:12,
                                fontWeight:'bold',
                                textTransform:'capitalize',
                                padding:5
                            }}>
                              {intl.formatMessage(messages.forgotPasswordText)}
                            </Typography>                             */}

                                                        
                            <VerificationButton
                              fullWidth 
                              variant="outlined" 
                              color="primary"
                              onClick={this.handleVerification}>
                              {intl.formatMessage(messages.verificationButton)}
                            </VerificationButton>
                            
                            <div style={{ flexGrow:1, marginTop:10 }} />
                            
                            {/* <ResetPasswordButton
                              fullWidth 
                              variant="outlined" 
                              color="primary">
                                {intl.formatMessage(messages.resetPasswordButton)}
                            </ResetPasswordButton> */}

                          </Grid>                      
                        </Grid>                    
                        <NotificationSnackbar 
                          verticalPos="bottom"
                          open={this.state.isNotificationOpen}
                          onClose={()=>this.props.logError(null)}
                          hideDuration={3000}
                          message={this.props.errorMessage} />
                      </form>
                    </Grid>
                  </Paper>
              </Grid>
          </Grid>
      </Wrapper>
    );
  }
}

// Login.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  credential: makeSelectCredential(),
  isLoading: makeSelectIsLoading(),
  token: makeSelectAuthToken(),
  errorMessage: makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {    
    changeNik: nik => dispatch(changeNikAction(nik)),
    changePassword: password => dispatch(changePasswordAction(password)),
    login: () => dispatch(loginAction()),
    resetInput: () => dispatch(resetInputAction()),
    logError: (error) =>dispatch(loginErrorAction(error))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key:"login", reducer }),
  injectSaga({ key:"saga", saga }),
  withConnect,
  injectIntl,
  memo,
)(Login);
