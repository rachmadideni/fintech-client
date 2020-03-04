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
import { color, typography } from 'styles/constants';
import {
  changeNikAction, 
  changePasswordAction,
  loginAction
} from './actions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import isEmpty from 'validator/lib/isEmpty';
// import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backdropOpen:false,
      email:"",
      password:"",
      error:{
        nik:null,
        email:null,
        password:null
      },
      isSubmitTriggered:false,
      isProcessing:false,
      showPassword:false
    }
  }

  toggleBackdrop = () => {
    this.setState((prevState,props)=>{
      console.log(prevState);
      return {
        ...prevState,        
        backdropOpen:!prevState.backdropOpen  
      }      
    })
  }
  
  // changeEmail = email => {
  //   this.setState(state=>({
  //     ...state,
  //     email
  //   }))
  // }
  
  // changePassword = password => {
  //   this.setState(state=>({
  //     ...state,
  //     password
  //   }))
  // }
  
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
      console.log('validated ok. now youre login');
      return this.props.login();
    }
    return false;
  }

  // handleProcessing = () => {
  //   this.setState(state => ({
  //     ...state,
  //     isProcessing:false
  //   }))
  // }

  handleClickShowPassword = () => {
    this.setState(state => ({ 
      showPassword: !state.showPassword 
    }));
  };

  render(){
    const { 
      intl, 
      credential,
      login,
      isLoading,
      changeNik,
      changePassword,
      token 
    } = this.props;

    if(token){
      return <Redirect to="/dashboard" />;
    }

    return (
      <Grid 
        container 
        wrap="nowrap"
        direction="column"      
        style={{
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:40,
          paddingRight:40
        }}>
          
          <Grid item xs>            
            <Backdrop 
              open={isLoading} 
              onClick={this.handlePro}
              style={{
                zIndex:1000,
                color:'#FFFFFF'
              }}>
                <Grid 
                  container 
                  wrap="nowrap" 
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{
                    width:150,                    
                  }}>
                  <Typography 
                    variant="body2"
                    align="center"
                    gutterBottom
                    style={{
                      fontFamily:typography.fontFamily,
                      marginBottom:20
                    }}>
                    {intl.formatMessage(messages.pleaseWaitIsLoading)}
                  </Typography>
                  <CircularProgress 
                    color="inherit" />
              </Grid>
            </Backdrop>
          </Grid>

          <Grid 
            item xs>
              <Grid 
                container 
                wrap="nowrap"
                direction="column">              
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
                          marginTop:100,
                          backgroundColor:'transparent'
                        }}>

                        <Typography 
                          variant="h5"
                          color="primary"
                          align="center"
                          gutterBottom>
                            {intl.formatMessage(messages.header)}                    
                        </Typography>
                      
                      <FormControl 
                        margin="normal" 
                        fullWidth>
                        <TextField 
                          id="nik" 
                          name="nik"
                          value={credential.nik} 
                          label={intl.formatMessage(messages.nik)}
                          style={{ textTransform:'capitalize' }}
                          type="text"
                          fullWidth
                          onChange={evt=>{
                            if(this.state.isSubmitTriggered){
                              this.validateNik(evt.target.value);
                            }
                            return changeNik(evt.target.value)
                          }}
                          error={!!this.state.error.nik}
                          helperText={this.state.error.nik} />
                      </FormControl>
                      <FormControl margin="normal" fullWidth>
                        <TextField 
                          id="password" 
                          name="password" 
                          value={credential.password}
                          label={intl.formatMessage(messages.password)}
                          style={{ textTransform:'capitalize' }}
                          onChange={evt=>{
                            if(this.state.isSubmitTriggered){
                              this.validatePassword(evt.target.value);
                            }
                            return changePassword(evt.target.value);
                          }}                 
                          type={this.state.showPassword ? 'text' : 'password'} 
                          fullWidth
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
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        onClick={this.handleSubmit}
                        style={{ 
                          marginTop:10,
                          boxShadow:'none'
                          }}>
                          {intl.formatMessage(messages.loginButton)}
                      </Button>
                      </Grid>
                      <Grid 
                        item 
                        style={{ 
                          flex:1,
                          marginTop:50,
                          backgroundColor:'transparent'
                        }}>
                        <Typography 
                          align="center"
                          gutterBottom 
                          style={{
                            fontSize:12,
                            fontWeight:'bold',
                            padding:5
                        }}>
                          {intl.formatMessage(messages.forgotPasswordText)}
                       </Typography>
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          color="primary"
                          style={{ marginTop:0 }}>
                            {intl.formatMessage(messages.resetPasswordButton)}                      
                        </Button>

                        <Typography 
                          align="center"
                          gutterBottom 
                          style={{
                            fontSize:12,
                            fontWeight:'bold',
                            padding:5
                        }}>
                          {intl.formatMessage(messages.accountNotVerified)}
                         </Typography>
                        
                        <Button 
                          onClick={this.handleVerification}
                          fullWidth 
                          variant="outlined" 
                          color="primary"
                          style={{ marginTop:0 }}>
                            {intl.formatMessage(messages.verificationButton)}                      
                        </Button>

                      </Grid>
                    </Grid>
                    <Snackbar 
                      anchorOrigin={{ 
                        vertical:'top',
                        horizontal:'left'}}
                      open={false}
                      autoHideDuration={5000}
                      message={'test snackbar bosku'}>
                    </Snackbar>
                  </form>
                </Grid>
              </Grid>
          </Grid>
      </Grid>
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
  token: makeSelectAuthToken()
});

function mapDispatchToProps(dispatch) {
  return {    
    changeNik: nik => dispatch(changeNikAction(nik)),
    changePassword: password => dispatch(changePasswordAction(password)),
    login: () => dispatch(loginAction())
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
