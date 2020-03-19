/**
 *
 * VerifyConfirmPage
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
import {
  makeSelectKodeAktifasi,
  makeSelectKodeFromServer,
  makeSelectError,
  makeSelectSuccess
} from './selectors';

import {
  makeSelectTokenVerifikasi,
  makeSelectKodeVerifikasi
} from '../Verifikasi/selectors';

import {
  changeKodeAktifasiAction,
  konfirmasiKodeAction,
  logErrorAction,
  logSuccessAction
} from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// import {
//   getTokenVerifikasiFromStorage
// } from '../Login/helpers';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'; 
import Paper from '@material-ui/core/Paper';

import { color, typography } from '../../styles/constants';

import isEmpty from 'validator/lib/isEmpty';
import styled from 'styled-components';
import bggreen01 from '../../images/bg_green_1.png';

import {
  AppBar,
  Toolbar
} from '@material-ui/core';

import {
  ArrowBack,
  ArrowForward
} from '@material-ui/icons';

import ReactCodeInput from 'react-code-input';
import NotificationSnackbar from 'components/NotificationSnackbar';
import NotificationSuccess from 'components/NotificationSnackbar';

import jwt_decode from 'jwt-decode';
var store = require('store');

const StyledCodeInput = styled(ReactCodeInput)`
&& {
  display:block;
  text-align:center;
  input {
    margin:2px;
    width:40px;
    height:40px;
    border-radius:4px;
    text-align:center;
    background-color:transparent;
    color:${color.subtleBlack};
    border: 2px solid ${color.grey};
    transition: all 150ms ease-in-out;
    outline: none;
  }
  input:focus {
    width:40px;
    height:40px;
    color:${color.green};
    border-color:${color.green};
  }
}`;

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

class VerifyConfirmPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      error:{
        errorMessage:null
      },
      isSubmitTriggered:false,
      isNotificationOpen:false,
      confirm:{
        successMessage:null
      },
      successNotified:false
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if(!!this.props.errorMessage && prevProps.errorMessage === null){
      this.setState(state=>({
        ...state,
        isNotificationOpen:true,
        // successNotified:false
      }));
    } else if(!!prevProps.errorMessage && this.props.errorMessage === null){
      this.setState(state=>({
        ...state,
        isNotificationOpen:false,
        // successNotified:true
      }));
    } else if(!!prevProps.successMessage && this.props.successMessage === null){
      this.setState(state=>({
        ...state,
        successNotified:false
      }))
    } else if(!!this.props.successMessage && prevProps.successMessage === null){
      this.setState(state=>({
        ...state,
        successNotified:true
      }))
    }
  }

  isTokenExpired = () => {
    let isExpired = false;
    // const token_verifikasi = getTokenVerifikasiFromStorage();
    const token_verifikasi = store.get('token_verifikasi');
    console.log(token_verifikasi);
    try {
      const { exp } = jwt_decode(token_verifikasi);
      console.log(exp);
      // console.log(exp * 1000);
      console.log(new Date(exp * 1000));
      if(Date.now() >= exp * 1000){
        isExpired = false;
      } else {
        isExpired = true;
      }
    } catch(err){
      isExpired = true;
    }

    return !isExpired;
  }

  validateKodeAktifasi = kode => {
    
    const { 
      intl,       
      kodeVerifikasi       
    } = this.props;

    console.log(this.isTokenExpired());

    let isError = false;
    let errorMsg = null;
    // let isSuccess = false;
    let successMessage = null;

    if(isEmpty(kode)){
      isError = true;
      // isSuccess = false;
      errorMsg = intl.formatMessage(messages.emptyCode);
      successMessage = null;
    } else if(kode !== kodeVerifikasi){
      isError = true;
      // isSuccess = false;
      errorMsg = intl.formatMessage(messages.codeNotMatch);
      successMessage = null;
    } else if(kode === kodeVerifikasi) {
      isError = false;
      // isSuccess = true;
      errorMsg = null;
      successMessage = intl.formatMessage(messages.codeIsMatch);      
    } else if(this.isTokenExpired()){      
      isError = true;
      errorMsg = int.formatMessage(messages.tokenExpired);
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        message:errorMsg
      }
    }));
    console.log(!isError);
    return !isError;
  }

  // handleSubmit(evt){
  //   evt.preventDefault();
  //   const { 
  //     kodeVerifikasi
  //   } = this.props;
    
  //   this.setState(state=>({
  //     ...state,
  //     isSubmitTriggered:true
  //   }));

  //   if(this.validateKodeAktifasi(kodeVerifikasi)){
  //     return this.props.konfirmasiKode();
  //   }
  //   return false;
  // }

  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  }

  autoSubmit = (val) => {    
    const { intl } = this.props;
    this.props.logSuccess(intl.formatMessage(messages.codeIsMatch));
    this.setState(state=>({    
      ...state,
      successNotified:true,
      confirm:{
        ...state.confirm,
        successMessage:intl.formatMessage(messages.codeIsMatch)
      }
    }))
    // console.log(this.state);
    // this.props.konfirmasiKode();
  }

  render(){
    const { 
      intl,
      kodeAktifasi,
      changeKodeAktifasi
    } = this.props;
    return (
      <Wrapper 
        container
        wrap="nowrap"
        direction="column">
          <AppBar style={{
            backgroundColor:'transparent',
            boxShadow:'none'
          }}>
            <Toolbar>
              <IconButton 
                onClick={this.handleBack}
                style={{ color:color.white }}>
                <ArrowBack />
              </IconButton>
              <div style={{ flexGrow:1 }} />
              <Typography                  
                gutterBottom
                style={{
                  fontFamily:typography.fontFamily,
                  fontSize:16,
                  fontWeight:'bold',
                  color:color.white,
                  paddingRight:10
                }}>
                Login
              </Typography>
            </Toolbar>
          </AppBar>
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
                    style={{                      
                      justifyContent:'center',
                      alignItems:'center'
                    }}>
                      <form 
                        autoComplete="off">
                        <Grid 
                          container 
                          wrap="nowrap"
                          direction="column">
                            <Grid 
                              item 
                              style={{                                
                                // marginTop:100
                              }}>
                                <Typography                                   
                                  color="primary"
                                  align="left"                                  
                                  style={{
                                    fontFamily:typography.fontFamily,
                                    fontWeight:'bold',
                                    fontSize:18,
                                    color:color.subtleBlack,
                                    textTransform:'capitalize',
                                  }}>
                                  {intl.formatMessage(messages.header)}  
                                </Typography>
                                                                
                                <FormControl 
                                  margin="dense" 
                                  fullWidth
                                  error={true}>
                                    <Typography                                 
                                  color="inherit"
                                  align="left"                                
                                  style={{
                                    fontFamily:typography.fontFamily,
                                    fontSize:12,
                                    fontWeight:'normal',
                                    color:color.subtleBlack,
                                    paddingLeft:5
                                  }}>
                                    masukkan kode verifikasi  
                                </Typography>                                   
                                  <StyledCodeInput                                     
                                    type="string"
                                    fields={6}
                                    onChange={val => {
                                      if(val.length === 6){                                        
                                        if(this.validateKodeAktifasi(val)){
                                          return this.autoSubmit(val);
                                        }
                                        // klo tidak cocok log error dan tampilkan notifikasi
                                        return this.props.logError(intl.formatMessage(messages.codeNotMatch));
                                      }
                                      return false;
                                    }} />
                                </FormControl>
                                {/* <Button
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  disabled={!!this.state.error.kodeAktifasi}
                                  onClick={this.handleSubmit}
                                  disableElevation
                                  style={{
                                    marginTop:5,
                                    fontFamily:typography.fontFamily,
                                    textTransform:'capitalize',
                                    fontWeight:'bold'
                                  }}>
                                    {intl.formatMessage(messages.btnConfirm)}
                                </Button> */}
                            </Grid>
                        </Grid>
                        
                        <NotificationSnackbar 
                          verticalPos="bottom"
                          open={this.state.isNotificationOpen}
                          onClose={()=>this.props.logError(null)}
                          hideDuration={3000}
                          message={this.props.errorMessage} />

                        <NotificationSuccess 
                          verticalPos="top"
                          open={this.state.successNotified}
                          onClose={ () => {
                            this.props.logSuccess(null);
                            return this.props.konfirmasiKode(); 
                          }}
                          hideDuration={3000}
                          message={this.props.successMessage} />
                      </form>
                    </Grid>
                  </Paper>
              </Grid>
          </Grid>
      </Wrapper>
    );
  }
}

VerifyConfirmPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeKodeAktifasi: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  kodeAktifasi: makeSelectKodeAktifasi(),
  kodeFromServer: makeSelectKodeFromServer(),

  tokenVerifikasi: makeSelectTokenVerifikasi(),
  kodeVerifikasi: makeSelectKodeVerifikasi(),
  errorMessage: makeSelectError(),
  successMessage: makeSelectSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeKodeAktifasi: (kode) => dispatch(changeKodeAktifasiAction(kode)),
    konfirmasiKode: () => dispatch(konfirmasiKodeAction()),
    logError: (err) =>  dispatch(logErrorAction(err)),
    logSuccess: (msg) =>  dispatch(logSuccessAction(msg))    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key:"verifyConfirmPage", reducer });
const withSaga = injectSaga({ key:"verifyConfirmPageSaga", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  memo,
)(VerifyConfirmPage);
