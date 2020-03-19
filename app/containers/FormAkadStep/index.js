/**
 *
 * FormAkadStep
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
  opsi_dokumen,
  stskwn,
  nmpsgn,
  noktpp,
  tglhrp,
  jmlank,
  uploaded
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import {
  STS_KWN
} from './constants';

import {
  getOpsiDokumenAction,
  changeStskwnAction,
  changeNmpsgnAction,
  changeTglhrpAction,
  changeNoktppAction,
  changeJmlankAction,
  addUploadedAction,
  submitFormAkadAction
} from './actions';

import styled from 'styled-components';
import validate from 'validate.js';
import { color, typography } from '../../styles/constants';

const Wrapper = styled(props=>{
  return (
    <Grid 
      container 
      wrap="nowrap" 
      direction="column"
      {...props}>
      {props.children}
    </Grid>
  );
})`
  && {    
    background-color:transparent;
    padding-top:10px;
    margin-top:12px;
    padding-left:20px;
    padding-right:20px;
  }
`;

class FormAkadStep extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:{
        nmpsgn:null,
        noktpp:null,
        jmlank:null,
        tglhrp:null,
      },
      isTriggered:false
    }
  }

  componentDidMount(){
    this.props.getOpsiDokumen();
  }

  validateInput = (inputValue, inputName) => {
    const { intl } = this.props
    let isError = false;
    let errorMessage = null;
    if(validate.isEmpty(inputValue)){
      isError = true;
            
      switch(inputName){
        case 'nmpsgn':
            errorMessage = intl.formatMessage(messages.empty_nmpsgn);
            break;
        case 'noktpp':
            errorMessage = intl.formatMessage(messages.empty_noktpp);
            break;
        case 'tglhrp':
            errorMessage = intl.formatMessage(messages.empty_tglhrp);
            break;        
        default:
            errorMessage = null;
      }      
    }
    
    this.setState( state => ({
      ...state,
      error:{
        ...state.error,
        [inputName]:errorMessage
      }
    }));

    return !isError;
  }

  handleFile = (event, idberk) => {
    if(!!event.target.files && !!event.target.files[0]){
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      return this.props.addUploaded(idberk, file, objectUrl);
    }
    return false;
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      nmpsgn,
      tglhrp,
      noktpp
    } = this.props;

    this.setState(prevState=>({
      ...prevState,
      isTriggered:true
    }));

    if(      
      this.validateInput(nmpsgn, 'nmpsgn') && 
      this.validateInput(noktpp, 'noktpp') && 
      this.validateInput(tglhrp, 'tglhrp' && 
      this.props.uploaded.length > 0)){
      // submit
      console.log('submitted');
      this.props.submitFormAkad();    
    } else {
      console.log('not submitted');
    }

    return false;

  }

  render(){
    
    const { 
      intl,
      changeStskwn,
      changeJmlank,
      changeNmpsgn,
      changeTglhrp,
      changeNoktpp
    } = this.props;

    const { error, isTriggered } = this.state;
    
    return (
      <Wrapper>
        <Grid item style={{
          height: '550px',
          overflowY:'auto'
        }}>
          <form autoComplete="off">
            <Typography
              gutterBottom
              style={{
                fontFamily:typography.fontFamily,
                fontSize:14,
                fontWeight:'bold',
                textTransform:'capitalize'
              }}>
              {intl.formatMessage(messages.form_title)}
            </Typography>
            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth>
                <InputLabel 
                  color="secondary" 
                  shrink>
                  {intl.formatMessage(messages.status_pernikahan)}
                </InputLabel>
                <Select 
                  id="stskwn" 
                  name="stskwn"
                  variant="outlined" 
                  margin="dense"
                  color="secondary"
                  labelWidth={130}
                  value={this.props.stskwn}
                  displayEmpty                      
                  onChange={ evt => {                      
                      return changeStskwn(evt.target.value); 
                    }}                    
                  style={{ 
                    fontFamily:typography.fontFamily,
                    fontSize:'13px',
                    textTransform:'lowercase'
                  }}>
                    {
                      STS_KWN.map((item,i)=>(
                        <MenuItem 
                          key={`item-stskwn-${i}`}
                          value={item.ID}
                          style={{
                            fontFamily:typography.fontFamily,
                            fontSize:'13px',
                            textTransform:'lowercase'                            
                          }}>
                            {item.NMSTAT}
                        </MenuItem>
                      ))
                    }
                </Select>
            </FormControl>

            <FormControl
              variant="outlined" 
              margin="dense" 
              fullWidth>
              <TextField 
                id="NMPSGN" 
                name="NMPSGN"
                color="secondary" 
                fullWidth
                InputLabelProps={{ shrink: true }} 
                variant="outlined"
                label={intl.formatMessage(messages.nmpsgn)}               
                margin="dense"
                value={this.props.nmpsgn}
                disabled={this.props.stskwn === 1 ? true : false}
                onChange={ evt => {
                    if(isTriggered){
                      this.validateInput(evt.target.value, 'nmpsgn');
                    }
                    return changeNmpsgn(evt.target.value);
                  }} 
                error={!!error.nmpsgn}
                helperText={error.nmpsgn}
                style={{
                  fontFamily:typography.fontFamily,
                  fontSize:'13px',
                  textTransform:'lowercase'
                }} />
            </FormControl>
            
            <FormControl
              variant="outlined" 
              margin="dense" 
              fullWidth>
              <TextField 
                id="noktpp" 
                name="noktpp"
                type="number"
                color="secondary" 
                fullWidth
                InputLabelProps={{ shrink: true }} 
                variant="outlined"
                label={intl.formatMessage(messages.noktpp)}               
                margin="dense"
                value={this.props.noktpp}
                disabled={this.props.stskwn === 1 ? true : false}
                onChange={ evt => {
                    if(isTriggered){
                      this.validateInput(evt.target.value, 'noktpp');
                    }
                    return changeNoktpp(evt.target.value);
                  }} 
                error={!!error.noktpp}
                helperText={error.noktpp}
                style={{
                  fontFamily:typography.fontFamily,
                  fontSize:'13px',
                  textTransform:'lowercase'
                }} />
            </FormControl>

            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth
              error={!!error.tglhrp}>
                <TextField                 
                  id="tglhrp" 
                  name="tglhrp"
                  type="date" 
                  fullWidth
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label={intl.formatMessage(messages.tglhrp)}
                  labelwidth={110} 
                  variant="outlined"                                               
                  margin="dense"
                  value={this.props.tglhrp}
                  disabled={this.props.stskwn === 1 ? true : false}
                  onChange={ evt => {
                      if(isTriggered){
                        this.validateInput(evt.target.value, 'tglhrp');
                      }
                      return changeTglhrp(evt.target.value); 
                    }} 
                  error={!!error.tglhrp}
                  helperText={error.tglhrp}
                  style={{
                    fontFamily:typography.fontFamily,
                    fontSize:'13px',
                    textTransform:'lowercase'
                  }} />                      
            </FormControl>
            
            <FormControl 
              variant="outlined" 
              margin="dense" 
              fullWidth
              error={!!error.jmlank}>
                <TextField                 
                  id="tglhrp" 
                  name="tglhrp"
                  type="number" 
                  fullWidth
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label={intl.formatMessage(messages.jmlank)}
                  labelwidth={110} 
                  variant="outlined"                                               
                  margin="dense"
                  value={this.props.jmlank}
                  disabled={this.props.stskwn === 1 ? true : false}
                  onChange={ evt => {
                      if(isTriggered){
                        this.validateInput(evt.target.value, 'jmlank');
                      }
                      return changeJmlank(evt.target.value); 
                    }} 
                  error={!!error.jmlank}
                  helperText={error.jmlank}
                  style={{
                    fontFamily:typography.fontFamily,
                    fontSize:'13px',
                    textTransform:'lowercase'
                  }} />                      
            </FormControl>

            <FormControl
              margin="dense" 
              fullWidth>
                {this.props.opsi_dokumen.map((item,i)=>(
                <Button                   
                  color="primary"
                  fullWidth
                  variant="outlined" 
                  component="label"                
                  onChange={ evt => this.handleFile(evt, item.IDBERK) }>
                  {`upload ${item.NMBERK}`}
                  <input 
                    id={item.NMBERK} 
                    name={item.NMBERK} 
                    type="file"
                    multiple 
                    accept="image/x-png,image/jpeg" 
                    style={{ display:'none' }} />
                </Button>
                ))}
            </FormControl>
            {this.props.uploaded.map((item,i) => (
              <Grid style={{ marginTop:5, width:'70px',height:'60px'}}>
                <Card raised={false}>
                  <CardActionArea>
                    <CardMedia image={`${item.objectURL}`} style={{ height:'60px' }}/>                    
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            <FormControl
              margin="dense" 
              fullWidth>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                onClick={ this.handleSubmit }>
                {intl.formatMessage(messages.btnSubmit)}
              </Button>
            </FormControl>
            
          </form>
        </Grid>
      </Wrapper>
    );
  }
}

FormAkadStep.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // formAkadStep: makeSelectFormAkadStep(),
  opsi_dokumen: opsi_dokumen(),
  stskwn: stskwn(),
  nmpsgn: nmpsgn(),
  noktpp: noktpp(),
  tglhrp: tglhrp(),
  jmlank: jmlank(),
  uploaded: uploaded()
});

function mapDispatchToProps(dispatch) {
  return {
    getOpsiDokumen: () => dispatch(getOpsiDokumenAction()),
    changeStskwn: (value) => dispatch(changeStskwnAction(value)),
    changeNmpsgn: (value) => dispatch(changeNmpsgnAction(value)),
    changeTglhrp: (value) => dispatch(changeTglhrpAction(value)),
    changeNoktpp: (value) => dispatch(changeNoktppAction(value)),
    changeJmlank: (value) => dispatch(changeJmlankAction(value)),
    addUploaded: (idberk, file, objectURL) => dispatch(addUploadedAction(idberk, file, objectURL)),
    submitFormAkad: () => dispatch(submitFormAkadAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formAkadStep', reducer });
const withSaga = injectSaga({ key: 'formAkadStepSaga', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  injectIntl,
  memo,
)(FormAkadStep);
