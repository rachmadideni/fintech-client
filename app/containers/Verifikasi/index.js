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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton'; 
import LoadingPage from 'components/LoadingPage';

import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
// import isMobilePhone from 'validator/lib/isMobilePhone';

import { color, typography } from '../../styles/constants';

import {
  ArrowBack,
  ArrowForward
} from '@material-ui/icons';

import { TweenLite } from 'gsap';

import {
  Wrapper,
  StyledPaper,
  AppTitle,
  PaperTitle,
  PaperSubtitle,
  CustomTextField,
  PaperButton
} from './components';

class Verifikasi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:{
        nik:null,
        email:null,
        nomorTelpon:null
      },
      isSubmitTriggered:false,
      isNotificationOpen:false
    }
    // reference to the DOM node
    this.paperElement = null;
    // reference to the animation
    this.myPaperTween = null;
  }

  componentDidMount(){
    this.myPaperTween = TweenLite.to(this.paperElement, 0.3, { y:25 });
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
    return history.replace('/login');
  }

  handleNotification = () => {
    console.log('handleNotification is called!');
    this.setState({
      isNotificationOpen:!isNotificationOpen
    })
  }

  checkOffline = () => {
    <Offline>
      {this.handleNotification}
    </Offline>
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
      <Wrapper 
        container
        wrap="nowrap"
        direction="column">
          {
            isLoading  && <LoadingPage />
          }
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
              <AppTitle 
                gutterBottom>
                Login
              </AppTitle>
            </Toolbar>
          </AppBar>

          <Grid
            item xs>
              <Grid 
                container
                wrap="nowrap"
                direction="column"
                justify="flex-start">
                                    
                  <StyledPaper 
                    ref={paper=>this.paperElement=paper}
                    elevation={0}>
                    
                  <Grid 
                    item>
                    <form 
                      autoComplete="off">
                        <Grid 
                          container 
                          wrap="nowrap"
                          direction="column">
                            <Grid 
                              item>                              
                              <PaperTitle 
                                variant="h6"
                                align="left">
                                {intl.formatMessage(messages.verifikasi)}
                              </PaperTitle>
                              <PaperSubtitle
                                color="inherit"
                                align="left">
                                {intl.formatMessage(messages.paperSubtitle)}
                              </PaperSubtitle>                              

                              <div style={{ marginTop:20 }} />

                                <FormControl 
                                  margin="dense" 
                                  fullWidth>
                                    <CustomTextField 
                                      id="nik" 
                                      name="nik"                               
                                      label={intl.formatMessage(messages.nik)}
                                      placeholder={'nomor induk karyawan'}
                                      value={user.nik}
                                      type="text" 
                                      fullWidth
                                      variant="outlined"
                                      margin="dense"
                                      onChange={ evt => {
                                        if(this.state.isSubmitTriggered){
                                          this.validateNik(evt.target.value);
                                        }
                                        return changeNik(evt.target.value)
                                      }}
                                      error={!!this.state.error.nik}
                                      helperText={this.state.error.nik} />
                                </FormControl>

                                <FormControl 
                                  margin="dense" 
                                  fullWidth>
                                    <CustomTextField 
                                      id="email" 
                                      name="email"                               
                                      label={intl.formatMessage(messages.email)}
                                      placeholder={'valid email'}
                                      value={user.email}
                                      type="email" 
                                      fullWidth
                                      variant="outlined"
                                      margin="dense"
                                      onChange={ evt => {
                                        if(this.state.isSubmitTriggered){
                                          this.validateEmail(evt.target.value);
                                        }
                                        return changeEmail(evt.target.value)
                                      }}
                                      error={!!this.state.error.email}
                                      helperText={this.state.error.email} />
                                  </FormControl>

                                  <FormControl 
                                    margin="dense" 
                                    fullWidth>
                                      <CustomTextField 
                                        id="nomtel" 
                                        name="nomtel"                               
                                        label={intl.formatMessage(messages.nomorTelpon)}
                                        placeholder={'nomor handphone aktif'}
                                        value={user.nomtel}
                                        type="number" 
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        onChange={ evt => {
                                          if(this.state.isSubmitTriggered){
                                            this.validateTelpon(evt.target.value);
                                          }
                                          return changeTelepon(evt.target.value)
                                        }}
                                        error={!!this.state.error.nomorTelpon}
                                        helperText={this.state.error.nomorTelpon} />
                                  </FormControl>
                                  
                                  <PaperButton
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!!this.state.error.email || !!this.state.error.nik || !!this.state.error.nomorTelpon}
                                    onClick={this.handleSubmit}
                                    disableElevation
                                    startIcon={<ArrowForward />}>
                                      {intl.formatMessage(messages.btnVerifikasi)}
                                  </PaperButton>                                                                                  
                            </Grid>
                        </Grid>
                    </form>
                  </Grid>
                  </StyledPaper>                  
                </Grid>
            </Grid>            
        </Wrapper>
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
