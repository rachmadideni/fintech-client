/**
 *
 * FormSubmissionStep
 *
 * Objective:
 * Directed user to specific submission step
 * Detect required input before proceeding to next step
 * give visual clues to user while he/she fills the forms
 * Back Button, Radial Progress, Step Title, Next Button (optional)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
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
  makeSelectDocuments,
  makeSelectPengajuan,
  makeSelectTourSimulasi
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import { 
  setCompletedStepAction,
  setActiveStepAction,
  setSimulasiTourAction 
} from './actions';

// MUI 
import Grid from '@material-ui/core/Grid';
import Tour from 'reactour';
import {
  TOUR_STEPS
} from '../PerhitunganAngsuran/constants';
// PAGES
import PerhitunganAngsuran from 'containers/PerhitunganAngsuran/Loadable';
import FormNasabah from 'containers/FormNasabah/Loadable';
import FormPekerjaan from 'containers/FormPekerjaan/Loadable';
import FormDocument from 'containers/FormDocument/Loadable';
import FormSummary from 'containers/FormSummary/Loadable';
import FormPengajuan from 'containers/FormPengajuan/Loadable';

// COMPONENTS
import FormStepper from '../../components/FormStepper';

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

const STEPS = [{
  step:0,
  url:'/application-form/step/customer/installment',
  item:PerhitunganAngsuran
},{
  step:1,
  url:'/application-form/step/customer/personal-details',
  item:FormNasabah
},{
  step:2,
  url:'/application-form/step/customer/work-related',
  item:FormPekerjaan
},{
  step:3,
  url:'/application-form/step/customer/documents',
  item:FormDocument
},{
  step:4,
  url:'/application-form/step/customer/pengajuan',
  item:FormPengajuan
},{
  step:5,
  url:'/application-form/step/customer/summary',
  item:FormSummary
}];

class FormSubmissionStep extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isTourOpen:true
    }
  }
  
  componentDidUpdate(prevProps, prevState){
    const { history, activeStep } = this.props;

    // routing based on props
    if(prevProps.activeStep !== this.props.activeStep){
      
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

      if(activeStep === 4){
        return history.push(`/application-form/step/customer/pengajuan`);
      }
      // summary
      if(activeStep === 5){
        return history.push(`/application-form/step/customer/summary`);
      }

    }
  }
  
  handleNextStep = () => {
    const { completedStep, activeStep } = this.props;     
    if(activeStep > -1 && activeStep <= completedStep.length){      
      this.props.setActiveStep(1); // 1 increment -1 decrement
      this.props.setCompletedStep(true, 25);      
    }
  }

  handleBackStep = () => {
    const { activeStep } = this.props;
    if(activeStep > -1){
      this.props.setActiveStep(-1);// 1 increment -1 decrement
      this.props.setCompletedStep(false, 0);
    }
  }

  handleTour = () => {
    this.setState(state=>({
      ...state,
      isTourOpen:!isTourOpen
    }))
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
          activeStep < completedStep.length ?  
                  
          <FormStepper            
            data-tour="first-step"
            activeStep={activeStep}
            stepProgress={stepProgress}
            completedStep={completedStep}                        
            onClickBack={this.handleBackStep}
            onClickNext={this.handleNextStep}
            intl={intl}
            title={intl.formatMessage(completedStep[activeStep].title)}
            subtitle={intl.formatMessage(completedStep[activeStep].subtitle)}
            gaji={this.props.gaji}
            plafon={this.props.plafon}
            margin={this.props.margin}
            tenor={this.props.tenor}
            limitAngsuran={this.props.limitAngsuran}
            nasabah={this.props.nasabah}
            work={this.props.work}
            documents={this.props.documents}
            pengajuan={this.props.pengajuan}
            tour_simulasi={this.props.tour_simulasi}
            setSimulasiTour={this.props.setSimulasiTour} />
             : null
        }            
            
            <Switch>
              {/* <Route                 
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
              <Route                 
                path="/application-form/step/customer/pengajuan"
                render={routeProps=>(
                  <FormPengajuan history={history} {...routeProps} />
                )} /> */}

                {
                  STEPS.map((route,i)=>{
                    return (
                      <Route 
                        path={route.url}
                        render={routeProps => (
                          <route.item history={history} {...routeProps} />
                        )} />
                    );
                  })
                }
              
            </Switch>              
      </Wrapper>
    );
  }
}

// FormSubmissionStep.propTypes = {
//     FormStepper: PropTypes.element.isRequired    
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
  documents: makeSelectDocuments(),
  pengajuan: makeSelectPengajuan(),
  tour_simulasi:makeSelectTourSimulasi()
});

function mapDispatchToProps(dispatch) {
  return {    
    setCompletedStep: (step,value,stepValue) => dispatch(setCompletedStepAction(step,value,stepValue)),
    setActiveStep: (step) => dispatch(setActiveStepAction(step)),
    setSimulasiTour: (open, count) => dispatch(setSimulasiTourAction(open, count)) 
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