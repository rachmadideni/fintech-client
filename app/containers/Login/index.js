/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLogin } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeEmailAction, changePasswordAction } from './actions';

import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
  FormControl
} from '@material-ui/core'

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';


import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backdropOpen:false,
      email:"",
      password:"",
      error:{
        email:null,
        password:null
      },
      isSubmitTriggered:false,
      isProcessing:false
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
  
  changeEmail = email => {
    this.setState(state=>({
      ...state,
      email
    }))
  }
  
  changePassword = password => {
    this.setState(state=>({
      ...state,
      password
    }))
  }

  validateEmail = email => {
    let isError = false;
    let errorMsg = null;
    if(isEmpty(email)){
      isError = true;
      errorMsg = 'email tidak boleh kosong'
    } else if (!isEmail(email)){
      isError = true;
      errorMsg = 'format email salah';
    } else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        email:errorMsg
      }
    }));
    return !isError;
  }
  
  validatePassword = password => {
    let isError = false;
    let errorMsg = null;
    if(isEmpty(password)){
      isError = true;
      errorMsg = 'password tidak boleh kosong'
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
    const { email, password } = this.state;
    this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(this.validateEmail(email) && this.validatePassword(password)){
      console.log('okay');
      this.setState( state => ({
        ...state,
        isProcessing:true
      }))
    }

    return false;    

  }

  handleProcessing = () => {
    this.setState(state=>({
      ...state,
      isProcessing:false
    }))
  }

  render(){
    const { 
      intl, 
      credential,
      login,
      changeEmail,
      changePassword } = this.props;

    return (
      <Grid 
        container 
        wrap="nowrap"      
        style={{        
          height:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Backdrop 
            open={this.state.isProcessing} 
            onClick={this.handlePro}
            style={{
              zIndex:1000,
              color:'#FFFFFF'
            }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid 
            item 
            xs={10} 
            sm={10} 
            lg={10} 
            style={{
              height:'100%',              
              // backgroundColor:'#FCFCFC'
              // backgroundColor:'red'
            }}>
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
                  <form autoComplete="off" style={{ backgroundColor:'transparent' }}>              
                    <Grid container wrap="nowrap" direction="column" style={{ flex:1 }}>
                    <Grid 
                      item 
                      style={{ 
                        flex:1,
                        marginTop:180,
                        backgroundColor:'transparent'
                      }}>
                    <Typography 
                      variant="h5"
                      color="primary"
                      align="center"
                      gutterBottom>
                        {intl.formatMessage(messages.header)}                    
                    </Typography>
                      <FormControl margin="normal" fullWidth>
                        <TextField 
                          id="email" 
                          name="email"
                          value={this.state.email} 
                          label={intl.formatMessage(messages.email)}                  
                          type="email" 
                          fullWidth
                          onChange={evt=>{
                            if(this.state.isSubmitTriggered){
                              this.validateEmail(evt.target.value);
                            }
                            return this.changeEmail(evt.target.value)
                          }}
                          error={!!this.state.error.email}
                          helperText={this.state.error.email} />
                      </FormControl>
                      <FormControl margin="normal" fullWidth>
                        <TextField 
                          id="password" 
                          name="password" 
                          value={this.state.password}
                          label={intl.formatMessage(messages.password)}
                          onChange={evt=>{
                            if(this.state.isSubmitTriggered){
                              this.validatePassword(evt.target.value);
                            }
                            return this.changePassword(evt.target.value);
                          }}                 
                          type="password" 
                          fullWidth
                          InputProps={{
                            endAdornment:(
                              <InputAdornment position="end">
                                <IconButton color="inherit">
                                  <Visibility />
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
                        onClick={this.toggleBackdrop}
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
                          <FormattedMessage {...messages.forgotPasswordText} />                      
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
                          <FormattedMessage {...messages.accountNotVerified} />                      
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
                      anchorOrigin={{ vertical:'top',horizontal:'left'}}
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
  // credential: makeSelectCredential()
});

function mapDispatchToProps(dispatch) {
  return {
    changeEmail: email => dispatch(changeEmailAction(email)),
    changePassword: password => dispatch(changePasswordAction(password)),

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
