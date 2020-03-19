/**
 *
 * CreatePassword
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
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectError
} from './selectors';
import messages from './messages';

import {
  changePasswordAction,
  changePasswordConfirmAction,
  submitPasswordAction
} from './actions';

import isEmpty from 'validator/lib/isEmpty';
import { color, typography } from '../../styles/constants';
import bggreen01 from '../../images/bg_green_1.png';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const PageAppbar =  styled(AppBar)`
  && {
    background-color:transparent;
    box-shadow:none;
  }
`;

const PageTitle = styled(Typography)`
&& {
  font-family:${typography.fontFamily};
  font-size:16px;
  font-weight:bold;
  color:${color.white};
  text-transform:capitalize;
}`;

const PagePaper = styled(Paper)`
&& {
  border-radius:12px;
  padding:15px 20px 20px 20px;
}
`;

class CreatePassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:{
        password:null,
        password_confirm:null
      },
      isSubmitTriggered:false
    }
  }

  validatePassword = password => {
    const { intl } = this.props;
    let isError = false;
    let errorMsg = null;
    if(isEmpty(password)){
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password);
    } else {
      isError = false;
      errorMsg = null;
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
  
  validatePasswordConfirm = password_confirm => {
    const { intl, password } = this.props;
    let isError = false;
    let errorMsg = null;
    if(isEmpty(password_confirm)){
      isError = true;
      errorMsg = intl.formatMessage(messages.empty_password_confirm);
    } else if(password !== password_confirm){
      isError = true;
      errorMsg = intl.formatMessage(messages.password_confirm_not_match);
    } else {
      isError = false;
      errorMsg = null;
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        password_confirm:errorMsg
      }
    }));
    return !isError;
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { password, password_confirm } = this.props;
    this.setState(state=>({
      ...state,
      isSubmitTriggered:true
    }));

    if(this.validatePassword(password) && this.validatePasswordConfirm(password_confirm)){
      console.log('sukses');
      return this.props.submitPassword();
    }
    return false;
  }

  render(){
    const { 
      intl,
      changePassword,
      changePasswordConfirm,
      password,
      password_confirm
    } = this.props;
    return (
      <Wrapper
        container
        wrap="nowrap"
        direction="column">
          <PageAppbar>
            <Toolbar>
              <div style={{ flexGrow:1 }} />
              <PageTitle
                gutterBottom>
                  Amanah Finance
              </PageTitle>
              <div style={{ flexGrow: 1 }} />
            </Toolbar>
          </PageAppbar>
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
                  <PagePaper
                    ref={ paper => this.paperElement = paper}
                    elevation={0}>              
                    <Grid 
                      item 
                      xs 
                      style={{ 
                        justifyContent:'center',
                        alignItems:'center'
                      }}>
                      <form autoComplete="off">
                      <Grid 
                          container 
                          wrap="nowrap" 
                          direction="column"
                          justify="center"
                          alignItems="center">
                          
                          <Grid 
                            item>
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
                                  {intl.formatMessage(messages.subtitle)}
                              </Typography>
                              <div style={{ marginTop:20 }} />
                              <FormControl 
                                margin="dense" 
                                fullWidth>
                                <TextField
                                  id="password"
                                  name="password"
                                  label="password"
                                  type="text"
                                  variant="outlined"
                                  margin="dense"
                                  value={password}
                                  onChange={ evt => {
                                    if(this.state.isSubmitTriggered){
                                      this.validatePassword(evt.target.value);
                                    }
                                    return changePassword(evt.target.value);
                                  }}
                                  error={!!this.state.error.password}
                                  helperText={this.state.error.password}
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
                                  id="konfirmasi_password"
                                  name="konfirmasi_password"
                                  label="konfirm password"
                                  type="text"
                                  variant="outlined"
                                  margin="dense"
                                  value={password_confirm}
                                  onChange={ evt => {
                                    if(this.state.isSubmitTriggered){
                                      this.validatePasswordConfirm(evt.target.value);
                                    }
                                    return changePasswordConfirm(evt.target.value);
                                  }}
                                  error={!!this.state.error.password_confirm}
                                  helperText={this.state.error.password_confirm}
                                  style={{
                                    fontFamily:typography.fontFamily,
                                    fontSize:12,
                                    backgroundColor:color.white,
                                    borderRadius:4,
                                    textTransform:'capitalize'                                        
                                  }} />
                              </FormControl>
                              <Button 
                                fullWidth 
                                variant="contained" 
                                color="primary"
                                disabled={!!this.props.errorMessage}
                                onClick={this.handleSubmit}
                                style={{
                                  marginTop:10,
                                  fontFamily:typography.fontFamily, 
                                  fontWeight:'bold',
                                  textTransform:'capitalize',
                                  boxShadow:'none'
                                }}>
                                {intl.formatMessage(messages.buatPassword)}
                              </Button>
                          </Grid>
                      </Grid>
                      </form>
                    </Grid>
                  </PagePaper>
                
                </Grid>
            </Grid>
      </Wrapper>
    );
  }
}

CreatePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  password_confirm: makeSelectPasswordConfirm(),
  errorMessage: makeSelectError()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changePassword: (data) => dispatch(changePasswordAction(data)),
    changePasswordConfirm: (data) => dispatch(changePasswordConfirmAction(data)),
    submitPassword: () => dispatch(submitPasswordAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key:"createPassword", reducer }),
  injectSaga({ key:"createPasswordSaga", saga }),
  injectIntl,
  memo,
)(CreatePassword);
