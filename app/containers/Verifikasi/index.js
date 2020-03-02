/**
 *
 * Verifikasi
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectIsLoading,
  makeSelectUser,
  makeSelectErrorMessage
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  changeNikAction,
  changeEmailAction,
  changeTeleponAction,
  verifikasiAction
} from './actions'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { color, typography } from '../../styles/constants';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
// import isMobilePhone from 'validator/lib/isMobilePhone';

class Verifikasi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // nik:"",
      // email:"",
      // nomorTelpon:"",
      error:{
        nik:null,
        email:null,
        nomorTelpon:null
      },
      isSubmitTriggered:false,
      // isProcessing:false
    }
  }

  validateNik = nik => {
    const { intl } = this.props
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

  validateEmail = email => {
    const { intl } = this.props
    let isError = false;
    let errorMsg = null;
    if(isEmpty(email)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyEmail);
    } else if (!isEmail(email)){
      isError = true;
      errorMsg = intl.formatMessage(messages.wrongEmailFormat);
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

  validateTelpon = telpon => {
    const { intl } = this.props
    let isError = false;
    let errorMsg = null;
    if(isEmpty(telpon)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyNomorTelpon);
    } 
    // else if (isMobilePhone(telpon)){
    //   console.log(isMobilePhone(telpon));
    //   isError = true;
    //   errorMsg ='minimal panjang nomor telpon/handphone 10 karakter'
    // } 
    else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        nomorTelpon:errorMsg
      }
    }));
    return !isError;
  }  

  handleSubmit = evt => {
    evt.preventDefault();
    const { user } = this.props;
    
      this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(
      this.validateNik(user.nik) && 
      this.validateEmail(user.email) && 
      this.validateTelpon(user.nomtel)
    ){      
      return this.props.verifikasi();
    }
    return false;
  }

  handleBack = () => {
    const { history } = this.props;
    return history.goBack();
  }

  render(){
    const { 
      intl,
      changeNik,
      changeEmail,
      changeTelepon,
      user,
      isLoading
    } = this.props
    return (
      <Grid 
        container
        wrap="nowrap"
        direction="column"
        style={{
          // height:'100%',
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:40,
          paddingRight:40
        }}>
          <Grid item xs>
            <Backdrop 
              open={isLoading} 
              onClick={()=>console.log('backdrop is clicked!')}
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
                      <FormattedMessage {...messages.pleaseWaitIsLoading} />
                      {/* {intl.formatMessage(messages.pleaseWaitIsLoading)} */}
                      
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
                    item xs
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
                            <Grid item style={{
                              marginTop:100
                            }}>
                              <Typography 
                                variant="h6"
                                color="primary"
                                align="center"
                                gutterBottom
                                style={{
                                  fontWeight:'bold'
                                }}>
                                {intl.formatMessage(messages.verifikasi)}  
                                </Typography>

                                <FormControl 
                                  margin="normal" 
                                  fullWidth>
                                    <TextField 
                                      id="nik" 
                                      name="nik"                               
                                      label={intl.formatMessage(messages.nik)}
                                      value={user.nik}
                                      type="text" 
                                      fullWidth
                                      onChange={ evt => {
                                        if(this.state.isSubmitTriggered){
                                          this.validateNik(evt.target.value);
                                        }
                                        return changeNik(evt.target.value)
                                      }}
                                      error={!!this.state.error.nik}
                                      helperText={this.state.error.nik}
                                      style={{
                                        fontFamily:typography.fontFamily                                        
                                      }} />
                                </FormControl>
                                <FormControl 
                                  margin="normal" 
                                  fullWidth>
                                    <TextField 
                                      id="email" 
                                      name="email"                               
                                      label={intl.formatMessage(messages.email)}
                                      value={user.email}
                                      type="email" 
                                      fullWidth
                                      onChange={ evt => {
                                        if(this.state.isSubmitTriggered){
                                          this.validateEmail(evt.target.value);
                                        }
                                        return changeEmail(evt.target.value)
                                      }}
                                      error={!!this.state.error.email}
                                      helperText={this.state.error.email}
                                      style={{
                                        fontFamily:typography.fontFamily
                                      }} />
                                  </FormControl>
                                  <FormControl 
                                    margin="normal" 
                                    fullWidth>
                                      <TextField 
                                        id="nomtel" 
                                        name="nomtel"                               
                                        label={intl.formatMessage(messages.nomorTelpon)}
                                        value={user.nomtel}
                                        type="number" 
                                        fullWidth
                                        onChange={ evt => {
                                          if(this.state.isSubmitTriggered){
                                            this.validateTelpon(evt.target.value);
                                          }
                                          return changeTelepon(evt.target.value)
                                        }}
                                        error={!!this.state.error.nomorTelpon}
                                        helperText={this.state.error.nomorTelpon}
                                        style={{
                                          fontFamily:typography.fontFamily
                                        }} />
                                  </FormControl>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!!this.state.error.email || !!this.state.error.nik || !!this.state.error.nomorTelpon}
                                    onClick={this.handleSubmit}
                                    disableElevation
                                    style={{
                                      marginTop:10,
                                      fontFamily:typography.fontFamily,
                                      textTransform:'capitalize'
                                    }}>
                                      {intl.formatMessage(messages.btnVerifikasi)}
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"                                    
                                    onClick={()=>console.log('cancel')}
                                    style={{
                                      marginTop:10,
                                      fontFamily:typography.fontFamily,
                                      textTransform:'capitalize'
                                    }}>
                                      {intl.formatMessage(messages.btnCancel)}
                                  </Button>
                            </Grid>
                        </Grid>                        
                    </form>
                  </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
  }
}

Verifikasi.propTypes = {
  isLoading:PropTypes.bool,
  user:PropTypes.object,
  error:PropTypes.object,
  changeNik:PropTypes.func,
  changeEmail:PropTypes.func,
  changeTelepon:PropTypes.func,
  verifikasi:PropTypes.func
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
  user: makeSelectUser(),
  error: makeSelectErrorMessage()
});

function mapDispatchToProps(dispatch) {
  return {
    changeNik: (nik) => dispatch(changeNikAction(nik)),
    changeEmail: (email) => dispatch(changeEmailAction(email)),
    changeTelepon: (nomtel) => dispatch(changeTeleponAction(nomtel)),
    verifikasi: () => dispatch(verifikasiAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key:"verifikasi", reducer });
const withSaga = injectSaga({ key:"verifikasiSaga", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
  memo,
)(Verifikasi);
