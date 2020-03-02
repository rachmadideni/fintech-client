/**
 *
 * FormPekerjaan
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectFormPekerjaan from './selectors';
import { makeSelectWorkData } from '../FormSubmissionStep/selectors';
import { 
  changeCompanyAction,
  changeCompanyJoinDateAction
} from './actions';
// import reducer from './reducer';
// import saga from './saga';
import messages from './messages';
import { GROUP_COMPANY } from './constants';

import styled from 'styled-components';
import validate from 'validate.js';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

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
      changeCompanyJoinDate
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
                      // if(isSubmitTriggered){
                      //   this.validateInput(evt.target.value,'company')
                      // }
                      // return this.onInputChange(evt.target.value,'company')
                      return changeCompany(evt.target.value);
                    }}
                    error={!!this.state.error.company}
                    helpertext={this.state.error.company}
                    variant="outlined" 
                    margin="dense"
                    color="secondary"
                    labelWidth={110}>
                      {GROUP_COMPANY.map((company,i)=><MenuItem key={`${company.title}-${i}`} value={company.value}>{company.title}</MenuItem>)}                      
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
              {/* <FormControl variant="outlined" fullWidth>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  onClick={this.handleSubmit}>
                  submit
                </Button>
              </FormControl> */}
            </form>
          </Grid>
      </Wrapper>
    )
  }
}

// FormPekerjaan.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  // formPekerjaan: makeSelectFormPekerjaan(),
  work: makeSelectWorkData()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    changeCompany: value => dispatch(changeCompanyAction(value)),
    changeCompanyJoinDate: value => dispatch(changeCompanyJoinDateAction(value))
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
