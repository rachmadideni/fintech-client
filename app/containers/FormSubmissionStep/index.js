/**
 *
 * FormSubmissionStep
 *
 * Functionality:
 * Directed user to specific submission step
 * Detect required input before proceeding to next step
 * give visual clues to user while he/she fills the forms
 * Back Button, Radial Progress, Step Title, Next Button (optional)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCompletedStep,
  makeSelectActiveStep,
  makeSelectStepProgress,
  makeSelectGaji,
  makeSelectPlafon,
  makeSelectMargin,
  makeSelectTenor,
  makeSelectLimitAngsuran,
  makeSelectNasabah,
  makeSelectWorkData,
  makeSelectDocuments
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { 
  setCompletedStepAction,
  setActiveStepAction } from './actions';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import RadialProgress from '../../components/RadialProgress';
import { IconButton, Typography } from '@material-ui/core';
import { 
  ChevronLeft, 
  ChevronRight, 
  // ArrowForwardIos, 
  // ArrowForwardIosRounded,
  // ArrowBackIosRounded
} from '@material-ui/icons';

import { Switch, Route } from 'react-router-dom';

import PerhitunganAngsuran from 'containers/PerhitunganAngsuran/Loadable';
import FormNasabah from 'containers/FormNasabah/Loadable';
import FormPekerjaan from 'containers/FormPekerjaan/Loadable';
import FormDocument from 'containers/FormDocument/Loadable';
import FormSummary from 'containers/FormSummary/Loadable';

import {
  check_max_installment
} from '../PerhitunganAngsuran/helpers';

// import Pinjaman from 'containers/Pinjaman';
// import FormPengajuan from 'containers/FormPengajuan/Loadable';

// Stepper Components
// TODO : we'll break it to individual components later

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
    justify-content:flex-end;
    margin-top:12px;
  }
`;

const StepBackButton = styled(props=> {
  const { active, onClickBack, ...otherProps } = props;
  return (
    <Grid {...otherProps}>
      <IconButton 
        edge="start" 
        color={active ? 'primary' : 'default'} 
        disable={active}
        disableRipple={!active ? true : false }
        onClick={onClickBack}>
        <ChevronLeft />
      </IconButton>
    </Grid>
  );
})``;

const StepNextButton = styled(props=> {
  const { isDisabled, onClickNext } = props;
  console.log(isDisabled);
  return (
    <Grid>
      <IconButton 
        edge="start"
        size="medium" 
        color="primary" 
        disabled={isDisabled}
        onClick={onClickNext}>
        <ChevronRight />
      </IconButton>
    </Grid>
  );
})``;

const StepCircularProgress = styled(props=>{
  const { stepvalue, currentstep, totalstep } = props;
  return (
    <Grid 
      container 
      wrap="nowrap"
      style={{
        flex:1,
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center'
      }}>
        <RadialProgress 
          variant="static" 
          size={36} 
          thickness={5} 
          value={stepvalue}         
          currentstep={currentstep}
          totalstep={totalstep}
          />
    </Grid>
  );
})`
&& {
  flex:1;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
`;

StepCircularProgress.propTypes = {
  totalstep:PropTypes.number
}

//
const StepTitleWrapper = styled(props=>{
  const { children, ...otherProps } = props;
  return (
    <Grid 
      container 
      wrap="nowrap"
      {...otherProps}>
      {children}
    </Grid>
  );
})`
&& {
  flex:3;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;  
}`;

const StepTitle = styled(props=>{
  const { title, ...otherProps } = props;
  return (
    <Typography {...otherProps}>
      {title}
    </Typography>
  )
})`
&& {
  font-size:14px;
  font-weight:bold;
  color:black;
  text-transform:capitalize;
}`;

const StepSubtitle = styled(props=>{
  const { subtitle, ...otherProps } = props;  
  return (
    <Typography {...otherProps}>
      {subtitle}
    </Typography>
  )
})`
  && {
    font-size:9px;
    font-weight:bold;
    color:grey;
    text-transform:capitalize;
  }
`

const check_customer_form = nasabah => {
  if(nasabah.fullname && nasabah.birthplace && nasabah.birthdate && nasabah.address && nasabah.gender){
    return false;
  }
  return true
}

const check_work_form = work => {
  if(work.company && work.companyJoinDate){
    return false;
  }
  return true;
}

const check_document_form = documents => {
  if(documents.ktp && documents.idcard){
    return false;
  }
  return true;
}

function FormStepper(props){
  const { 
    intl,
    stepProgress,
    completedStep,
    onClickNext,
    onClickBack,
    activeStep,
    gaji,
    plafon,
    margin,
    tenor,
    limitAngsuran,
    nasabah,
    work,
    documents
  } = props;  

  // let stepValueTotal = completedStep.reduce((a,b)=>a+(b['stepValue'] || 0),0);
  // let currentStep = completedStep.findIndex((el)=>el.isActive === false) > -1 ? completedStep.findIndex((el)=>el.isActive === false) : completedStep.length-1;
  let currstep = completedStep[activeStep].number;
  let totalstep = completedStep.length;
  
  return (
    <Grid 
      container 
      wrap="nowrap">
        {
          activeStep > 0 && 
          <StepBackButton 
            active={true}
            onClickBack={onClickBack} />
        }                            
        <StepCircularProgress
          stepvalue={stepProgress} 
          currentstep={currstep} 
          totalstep={totalstep} />
        
        <StepTitleWrapper>
          <StepTitle 
            title={intl.formatMessage(completedStep[activeStep].title)} />
          <StepSubtitle 
            subtitle={intl.formatMessage(completedStep[activeStep].subtitle)} />
        </StepTitleWrapper>
        {
          activeStep === 0 ? 
          <StepNextButton
            onClickNext={onClickNext} 
            isDisabled={gaji < 1 || check_max_installment(limitAngsuran,plafon,margin,tenor)} /> : null             
        }{
          activeStep === 1 ?
          <StepNextButton
            onClickNext={onClickNext} 
            isDisabled={check_customer_form(nasabah)} /> : null
        }
        {
          activeStep === 2 ?
          <StepNextButton
            onClickNext={onClickNext} 
            isDisabled={check_work_form(work)} /> : null
        }
        {
          activeStep === 3 ?
          <StepNextButton
            onClickNext={onClickNext} 
            isDisabled={check_document_form(documents)} /> : null
        }
        {/* {
          activeStep === 4 ?
          <StepNextButton
            onClickNext={onClickNext} 
            isDisabled={false} /> : null
        } */}
    </Grid>
  );  
}

FormStepper.propTypes = {
  stepProgress:PropTypes.number.isRequired,
  completedStep:PropTypes.array.isRequired,
  onClickNext:PropTypes.func.isRequired,
  onClickBack:PropTypes.func.isRequired
}

class FormSubmissionStep extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidUpdate(prevProps, prevState){
    const { history, activeStep } = this.props;

    // routing based on props
    if(prevProps.activeStep !== this.props.activeStep){
      
      // let stepIndex = this.props.completedStep.map(el => el.isActive).lastIndexOf(false);
      // let stepIndex = this.props.completedStep.findIndex((el)=>el.isActive === false);

      if(activeStep === 0){
        return history.push(`/application-form/step/customer/installment`);                  
      }

      if(activeStep === 1){
        return history.push(`/application-form/step/customer/personal-details`);                  
      }
      
      if(activeStep === 2){
        return history.push(`/application-form/step/customer/work-related`);
      }
      
      if(activeStep === 3){
        return history.push(`/application-form/step/customer/documents`);
      }

      // summary
      if(activeStep === 4){
        return history.push(`/application-form/step/customer/summary`);
      }

    }
  }
  
  handleNextStep = () => {
    const { completedStep, activeStep } = this.props;
    //let currentstep = completedStep.findIndex((el)=>el.isActive === false);     
    if(activeStep > -1 && activeStep <= completedStep.length){
      console.log(activeStep)
      console.log(completedStep.length)
      this.props.setActiveStep(1);// 1 increment -1 decrement
      this.props.setCompletedStep(true, 25);      
    }
  }

  handleBackStep = () => {
    const { activeStep } = this.props;
    // let stepIndex = this.props.completedStep.map(el => el.isActive).lastIndexOf(true);
    if(activeStep > -1){
      this.props.setActiveStep(-1);// 1 increment -1 decrement
      this.props.setCompletedStep(false, 0);
    }
  }

  render(){
    const {
      intl, 
      history,
      completedStep,
      activeStep,
      stepProgress
    } = this.props;

    return (
      <Wrapper>
       
        {
          activeStep < completedStep.length &&         
          <FormStepper
            activeStep={activeStep}
            stepProgress={stepProgress}
            completedStep={completedStep}                        
            onClickBack={this.handleBackStep}
            onClickNext={this.handleNextStep}
            intl={intl}
            gaji={this.props.gaji}
            plafon={this.props.plafon}
            margin={this.props.margin}
            tenor={this.props.tenor}
            limitAngsuran={this.props.limitAngsuran}
            nasabah={this.props.nasabah}
            work={this.props.work}
            documents={this.props.documents} />
        }
            <Switch>
              <Route                 
                path="/application-form/step/customer/installment"
                render={routeProps=>(
                  <PerhitunganAngsuran history={history} {...routeProps} />
                )} />                    
              <Route                 
                path="/application-form/step/customer/personal-details"
                render={routeProps=>(
                  <FormNasabah history={history} {...routeProps} />
                )} />
              <Route                 
                path="/application-form/step/customer/work-related"
                render={routeProps=>(
                  <FormPekerjaan history={history} {...routeProps} />
                )} />
              <Route                 
                path="/application-form/step/customer/documents"
                render={routeProps=>(
                  <FormDocument history={history} {...routeProps} />
                )} />              
              <Route                 
                path="/application-form/step/customer/summary"
                render={routeProps=>(
                  <FormSummary history={history} {...routeProps} />
                )} />
            </Switch>              
      </Wrapper>
    );
  }
}

// FormSubmissionStep.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  completedStep: makeSelectCompletedStep(),
  activeStep: makeSelectActiveStep(),
  stepProgress: makeSelectStepProgress(),
  gaji: makeSelectGaji(),
  plafon: makeSelectPlafon(),
  margin: makeSelectMargin(),
  tenor: makeSelectTenor(),
  limitAngsuran: makeSelectLimitAngsuran(),
  nasabah: makeSelectNasabah(),
  work: makeSelectWorkData(),
  documents: makeSelectDocuments()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    setCompletedStep: (step,value,stepValue) => dispatch(setCompletedStepAction(step,value,stepValue)),
    setActiveStep: (step) => dispatch(setActiveStepAction(step))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formSubmissionStep', reducer });
const withSaga = injectSaga({ key: 'formSubmissionStepSaga', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl
)(FormSubmissionStep);