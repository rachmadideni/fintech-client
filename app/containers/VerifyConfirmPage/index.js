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
  makeSelectError
} from './selectors';
import {
  changeKodeAktifasiAction,
  konfirmasiKodeAction,
  logErrorAction
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

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
      isNotificationOpen:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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

  validateKodeAktifasi = kode => {
    const { 
      intl, 
      kodeFromServer 
    } = this.props
    let isError = false;
    let errorMsg = null;
    if(isEmpty(kode)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyCode);
    } else if(kode !== kodeFromServer){
      isError = true;
      errorMsg = intl.formatMessage(messages.codeNotMatch);
      // console.log(kode);
      // console.log(kodeFromServer);
      // console.log(errorMsg);
    }
      else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        // kodeAktifasi:errorMsg,
        message:errorMsg
      }
    }));
    return !isError;
  }

  handleSubmit(evt){
    evt.preventDefault();
    const { kodeAktifasi } = this.props;
    this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(this.validateKodeAktifasi(kodeAktifasi)){
      return this.props.konfirmasiKode();
    }
    return false;
  }

  handleBack = () => {
    const { history } = this.props;
    return history.replace('/login');
  }

  testSubmit = (val) => {
    console.log(val);
    this.props.changeKodeAktifasi(val);
    this.props.konfirmasiKode();
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
                                
                                {/* <FormControl 
                                  margin="dense" 
                                  fullWidth>
                                    <TextField 
                                      id="nik" 
                                      name="nik"                               
                                      label={intl.formatMessage(messages.kodeAktifasi)}
                                      value={kodeAktifasi}
                                      type="text" 
                                      fullWidth
                                      variant="outlined"
                                      margin="dense"
                                      placeholder="masukkan kode aktifasi"
                                      onChange={ evt => {
                                        if(this.state.isSubmitTriggered){
                                          this.validateKodeAktifasi(evt.target.value);
                                        }
                                        return changeKodeAktifasi(evt.target.value)
                                      }}
                                      error={!!this.state.error.kodeAktifasi}
                                      helperText={this.state.error.kodeAktifasi}
                                      style={{
                                        fontFamily:typography.fontFamily                                        
                                      }} />
                                </FormControl> */}
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
                                    type="number"
                                    fields={6}
                                    onChange={val => {
                                      if(val.length === 6){                                        
                                        // cek kode inputan user cocok dgn kode dari server 
                                        if(this.validateKodeAktifasi(val)){
                                          // klo kode cocok simpan ke state fromUser_activation_code
                                          return this.testSubmit(val);        
                                          // return changeKodeAktifasi(val);
                                          // return this.props.konfirmasiKode();
                                        }
                                        // klo tidak cocok log error dan tampilkan notifikasi
                                        return this.props.logError(intl.formatMessage(messages.codeNotMatch));
                                        // return false;
                                      }
                                      return false;
                                    }} />
                                </FormControl>
                                <Button
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
                                </Button>
                            </Grid>
                        </Grid>
                        <NotificationSnackbar 
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

VerifyConfirmPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeKodeAktifasi: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  // verifyConfirmPage: makeSelectVerifyConfirmPage(),
  kodeAktifasi: makeSelectKodeAktifasi(),
  kodeFromServer: makeSelectKodeFromServer(),
  errorMessage: makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeKodeAktifasi: (kode) => dispatch(changeKodeAktifasiAction(kode)),
    konfirmasiKode: () => dispatch(konfirmasiKodeAction()),
    logError: (err) =>  dispatch(logErrorAction(err))
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
