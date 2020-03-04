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
  makeSelectKodeAktifasi
} from './selectors';
import {
  changeKodeAktifasiAction,
  konfirmasiKodeAction
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { color, typography } from '../../styles/constants';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import isEmpty from 'validator/lib/isEmpty';

class VerifyConfirmPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:{
        kodeAktifasi:null
      },
      isSubmitTriggered:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateKodeAktifasi = kode => {
    const { intl } = this.props
    let isError = false;
    let errorMsg = null;
    if(isEmpty(kode)){
      isError = true;
      errorMsg = intl.formatMessage(messages.emptyCode);
    } else {
      isError = false;
      errorMsg = null
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        kodeAktifasi:errorMsg
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

  render(){
    const { 
      intl,
      kodeAktifasi,
      changeKodeAktifasi
    } = this.props;
    return (
      <Grid 
        container
        wrap="nowrap"
        direction="column"
        style={{
          marginTop:100,
          justifyContent:'center',
          alignItems:'center',
          paddingLeft:40,
          paddingRight:40,
          // display:'flex'
        }}>
          <Grid
            item xs>
              <Grid 
                container
                wrap="nowrap"
                direction="column">
                  <Grid 
                    item
                    style={{                      
                      justifyContent:'center',
                      alignItems:'center'
                    }}>
                      <form autoComplete="off">
                      <Grid 
                          container 
                          wrap="nowrap"
                          direction="column">
                            <Grid 
                              item 
                              style={{                                
                                marginTop:100
                              }}>
                              <Typography 
                                variant="h6"
                                color="primary"
                                align="center"
                                gutterBottom
                                style={{
                                  fontWeight:'bold',
                                  textTransform:'capitalize'
                                }}>
                                {intl.formatMessage(messages.header)}  
                              </Typography>
                              <FormControl 
                                margin="normal" 
                                fullWidth>
                                  <TextField 
                                    id="nik" 
                                    name="nik"                               
                                    label={intl.formatMessage(messages.kodeAktifasi)}
                                    value={kodeAktifasi}
                                    type="text" 
                                    fullWidth
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
                      </form>

                  </Grid>
              </Grid>
          </Grid>
      </Grid>
    );
  }
}

VerifyConfirmPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changeKodeAktifasi: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  // verifyConfirmPage: makeSelectVerifyConfirmPage(),
  kodeAktifasi: makeSelectKodeAktifasi()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeKodeAktifasi: (kode) => dispatch(changeKodeAktifasiAction(kode)),
    konfirmasiKode: () => dispatch(konfirmasiKodeAction())
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
