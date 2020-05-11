/**
 *
 * FormPekerjaan
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { 
  makeSelectWorkData,
  makeSelectSbu
} from '../FormSubmissionStep/selectors';

import { 
  changeCompanyAction,
  changeCompanyJoinDateAction,
  getOpsiSbuAction
} from './actions';

import messages from './messages';
import styled from 'styled-components';
import validate from 'validate.js';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { map } from 'lodash/collection';

const Wrapper = styled(props=>{
  return (
    <Grid {...props} />
  )})`
&& {
  background-color:transparent;
  padding-left:20px;
  padding-right:20px;
  padding-top:10px;
}`;

class FormPekerjaan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      company:"",
      companyJoinDate:"",
      error:{
        company:null,
        companyJoinDate:null
      },
      isSubmitTriggered:false
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount(){
    this.props.getOpsiSbu();
  }

  onInputChange(inputValue,inputName){
    this.setState({
      [inputName]:inputValue
    })
  }

  validateInput(inputValue,inputName){
    const { intl } = this.props;
    let isError = false;
    let errorMessage = null;
    if(validate.isEmpty(inputValue)){
      isError = true;

      switch(inputName){
        case 'company':
          errorMessage = intl.formatMessage(messages.emptyCompany);
        case 'companyJoinDate':
          errorMessage = intl.formatMessage(messages.emptyCompanyJoinDate);
        default:
          errorMessage = null;
      }
    }

    this.setState(state=>({
      ...state,
      error:{
        ...state.error,
        [inputName]:errorMessage
      }
    }))
    return !isError;
  }

  checkJenisProduk = (companyId) => {    
    const { opsiSbu, changeCompany } = this.props;    
    let f = opsiSbu.filter((item,i) => item.IDSBU === companyId);
    if(f){      
      let jenisProduk = f[0].QARDH === 1 ? 3 : 2;
      return changeCompany(companyId, jenisProduk);
    } else {
      return false;
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const {company,companyJoinDate} = this.state;
    this.setState(prevState=>({
      ...prevState,
      isSubmitTriggered:true
    }));

    if(this.validateInput(company,'company') && this.validateInput(companyJoinDate,'companyJoinDate')){
      console.log('the form is clean and submitted to the server');
    }
    return false;
  }

  render(){
    const { 
      intl,
      work,
      changeCompany,
      changeCompanyJoinDate,
      opsiSbu
    } = this.props;
    const { company, companyJoinDate, isSubmitTriggered } = this.state;
    return (
      <Wrapper 
        container 
        wrap="nowrap"
        direction="column"
        alignItems="center"
        style={{
          backgroundColor:'transparent'
        }}>
          <Grid item style={{ width:'100%' }}>
            <form autoComplete="off">
              <FormControl 
                variant="outlined" 
                margin="dense" 
                fullWidth>
                  <InputLabel color="secondary" shrink>
                  {intl.formatMessage(messages.company)}
                  </InputLabel>
                  <Select 
                    id="company" 
                    name="company"
                    value={work.company}                    
                    fullWidth
                    onChange={evt=>{                      
                      this.checkJenisProduk(evt.target.value);                      
                    }}
                    error={!!this.state.error.company}
                    helpertext={this.state.error.company}
                    variant="outlined" 
                    margin="dense"
                    color="secondary"
                    labelWidth={110}
                    style={{
                      textTransform:'lowercase'
                    }}>                      
                      {opsiSbu.map((sbu,i) => 
                        <MenuItem 
                          key={`${sbu.title}-${i}`} 
                          value={sbu.IDSBU} 
                          style={{
                            textTransform:'lowercase'
                          }}>
                          {sbu.NMSBU}
                        </MenuItem>)}                      
                  </Select>
              </FormControl>
              <FormControl 
                variant="outlined"
                margin="dense" 
                fullWidth>
                <TextField                 
                  id="companyJoinDate" 
                  name="companyJoinDate"
                  type="date"
                  value={work.companyJoinDate}
                  onChange={evt=>{
                    // if(isSubmitTriggered){
                    //   this.validateInput(evt.target.value,'companyJoinDate')
                    // }
                    // return this.onInputChange(evt.target.value,'companyJoinDate')
                    return changeCompanyJoinDate(evt.target.value);
                  }} 
                  fullWidth
                  color="secondary"
                  InputLabelProps={{ shrink: true }}
                  label={intl.formatMessage(messages.companyJoinDate)}
                  labelwidth={110} 
                  variant="outlined"                               
                  margin="dense" />
              </FormControl>              
            </form>
          </Grid>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({  
  work: makeSelectWorkData(),
  opsiSbu: makeSelectSbu()
});

function mapDispatchToProps(dispatch) {
  return {    
    changeCompany: (company,jenisProduk) => dispatch(changeCompanyAction(company,jenisProduk)),
    changeCompanyJoinDate: value => dispatch(changeCompanyJoinDateAction(value)),
    getOpsiSbu: () => dispatch(getOpsiSbuAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(FormPekerjaan);
