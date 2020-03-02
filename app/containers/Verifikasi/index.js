/**
 *
 * Verifikasi
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
import makeSelectVerifikasi from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

import {
  ChevronLeft
} from '@material-ui/icons';

import { color } from '../../styles/constants';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

class Verifikasi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nik:"",
      email:"",
      nomorTelpon:"",
      error:{
        nik:null,
        email:null,
        nomorTelpon:null
      },
      isSubmitTriggered:false,
      isProcessing:false
    }
  }

  validateNik = nik => {
    let isError = false;
    let errorMsg = null;
    if(isEmpty(nik)){
      isError = true;
      errorMsg = 'nomor induk karyawan tidak boleh kosong'
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

  validateTelpon = telpon => {
    let isError = false;
    let errorMsg = null;
    if(isEmpty(telpon)){
      isError = true;
      errorMsg = 'nomor telpon tidak boleh kosong'
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

  changeNik = nik => {
    this.setState(state=>({
      ...state,
      nik
    }))
  }
  
  changeEmail = email => {
    this.setState(state=>({
      ...state,
      email
    }))
  }
  
  changeNomorTelpon = nomorTelpon => {
    this.setState(state=>({
      ...state,
      nomorTelpon
    }))
  }

  handleProcessing = () => {
    this.setState(state=>({
      ...state,
      isProcessing:false
    }))
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { nik, email, nomorTelpon } = this.state;
    this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(this.validateNik(nik) && this.validateEmail(email) && this.validateTelpon(nomorTelpon)){
      console.log('okay');
      this.setState( state => ({
        ...state,
        isProcessing:true
      }))
    }

    return false;

  }

  handleBack = () => {
    const { history } = this.props;
    return history.goBack();
  }

  render(){
    const { intl } = this.props
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
            onClick={this.handleProcessing}
            style={{
              zIndex:1000,
              color:'#FFFFFF'
            }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <AppBar style={{
            backgroundColor:'transparent',
            boxShadow:'none'
          }}>
            <Toolbar>
            <IconButton 
              edge="start" 
              onClick={this.handleBack}
              style={{
                color:color.grey
              }}>
                <ChevronLeft />
            </IconButton>
            <Typography                
              style={{
                fontSize:16,
                color:color.grey
              }}>
                {intl.formatMessage(messages.goBack)}
            </Typography>
            </Toolbar>
          </AppBar>
          <Grid
            item
            xs={10}
            sm={10}
            lg={10}
            style={{              
              flex:1,
              backgroundColor:'transparent'
            }}>
              <Grid 
                container
                wrap="nowrap"
                direction="column" 
                style={{ 
                  backgroundColor:'transparent'
                }}>
                  <Grid item xs>
                    <form 
                      autoComplete="off">
                        <Grid item>
                          <Typography 
                            variant="h6"
                            color="primary"
                            align="center"
                            gutterBottom
                            style={{
                              fontWeight:'bold'
                            }}>
                            {intl.formatMessage(messages.header)}  
                            </Typography>
                            
                            <FormControl 
                              margin="normal" 
                              fullWidth>
                                <TextField 
                                  id="nik" 
                                  name="nik"                               
                                  label={intl.formatMessage(messages.nik)}
                                  value={this.state.nik}
                                  type="text" 
                                  fullWidth
                                  onChange={ evt => {
                                    if(this.state.isSubmitTriggered){
                                      this.validateNik(evt.target.value);
                                    }
                                    return this.changeNik(evt.target.value)
                                  }}
                                  error={!!this.state.error.nik}
                                  helperText={this.state.error.nik} />
                            </FormControl>
                            <FormControl 
                              margin="normal" 
                              fullWidth>
                                <TextField 
                                  id="email" 
                                  name="email"                               
                                  label={intl.formatMessage(messages.email)}
                                  value={this.state.email}
                                  type="email" 
                                  fullWidth
                                  onChange={ evt => {
                                    if(this.state.isSubmitTriggered){
                                      this.validateEmail(evt.target.value);
                                    }
                                    return this.changeEmail(evt.target.value)
                                  }}
                                  error={!!this.state.error.email}
                                  helperText={this.state.error.email} />
                              </FormControl>
                              <FormControl 
                                margin="normal" 
                                fullWidth>
                                <TextField 
                                  id="nomtel" 
                                  name="nomtel"                               
                                  label={intl.formatMessage(messages.nomorTelpon)}
                                  value={this.state.nomorTelpon}
                                  type="number" 
                                  fullWidth
                                  onChange={ evt => {
                                    if(this.state.isSubmitTriggered){
                                      this.validateTelpon(evt.target.value);
                                    }
                                    return this.changeNomorTelpon(evt.target.value)
                                  }}
                                  error={!!this.state.error.nomorTelpon}
                                  helperText={this.state.error.nomorTelpon} />
                            </FormControl>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={!!this.state.error.email || !!this.state.error.nik || !!this.state.error.nomorTelpon}
                              onClick={this.handleSubmit}
                              style={{
                                marginTop:10
                              }}>
                                {intl.formatMessage(messages.btnVerifikasi)}
                            </Button>
                        </Grid>
                    </form>
                  </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  verifikasi: makeSelectVerifikasi(),
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
  injectIntl,
)(Verifikasi);
