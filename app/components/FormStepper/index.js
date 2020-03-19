/**
 *
 * FormStepper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import StepBackButton from './StepBackButton';
import StepNextButton from './StepNextButton';
import StepCircularProgress from './StepCircularProgress';
import StepContentComp from './StepContentComp';
import { check_max_installment } from '../../containers/PerhitunganAngsuran/helpers';


function FormStepper(props) {
  const {
    intl,
    title,
    subtitle,
    activeStep,
    stepProgress,
    completedStep,
    onClickNext,
    onClickBack,
    gaji,
    plafon,
    margin,
    tenor,
    limitAngsuran,
    nasabah,
    work,
    documents,
    pengajuan
  } = props;

  let currstep = completedStep[activeStep].number;
  let totalstep = completedStep.length;

  const check_customer_form = nasabah => {
    if(nasabah.fullname && nasabah.birthplace && nasabah.birthdate && nasabah.address && nasabah.gender && nasabah.mother_maiden_name){
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
    let ktp = documents.uploaded.findIndex((elem) => elem.idberk === 3);  
    let idcard = documents.uploaded.findIndex((elem) => elem.idberk === 5);  
    let npwp = documents.uploaded.findIndex((elem) => elem.idberk === 6);  
    // if(ktp > -1 && idcard > -1 && npwp > -1){
    if(ktp > -1){
      return false;
    }
    return true;
  }

  const check_pengajuan_form = pengajuan => {
    if(pengajuan.jenis && pengajuan.tujuan) {
      return false;
    }
    return true;
  }

  return (
    <Grid 
      container 
      wrap="nowrap"
      style={{
        marginBottom:10
      }}>
        { activeStep > 0 && <StepBackButton active={true} onClickBack={onClickBack} /> }
        <StepCircularProgress 
          stepvalue={stepProgress}
          currentstep={currstep}
          totalstep={totalstep} />
         
        <StepContentComp 
          title={title}
          subtitle={subtitle} />
        
        { activeStep === 0 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={ 
              gaji < 1 || check_max_installment(limitAngsuran,plafon,margin,tenor) } /> : null
        }
        { activeStep === 1 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={
              check_customer_form(nasabah)
            } /> : null
        }
        { activeStep === 2 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={
              check_work_form(work)
            } /> : null
        }
        { activeStep === 3 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={
              check_document_form(documents)
            } /> : null
        }
        {/* { activeStep === 4 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={
              check_pengajuan_form(pengajuan)
            } /> : null
        } */}
    </Grid>
  );
}

FormStepper.propTypes = {
  stepProgress:PropTypes.number.isRequired,
  completedStep:PropTypes.array.isRequired,
  onClickNext:PropTypes.func.isRequired,
  onClickBack:PropTypes.func.isRequired
};

export default FormStepper;
