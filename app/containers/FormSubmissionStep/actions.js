/*
 *
 * FormSubmissionStep actions
 *
 */

import {   
  SET_COMPLETED_STEP_ACTION,
  SET_ACTIVE_STEP,
  SET_NASABAH_ACTION,
} from './constants';

export function setCompletedStepAction(value,stepValue){
  return {
    type:SET_COMPLETED_STEP_ACTION,
    payload:{      
      isActive:value,
      stepValue
    }
  }
}

export function setActiveStepAction(step){
  return {
    type:SET_ACTIVE_STEP,
    payload:step
  }
}

export function setNasabahAction(nasabah){
  return {
    type:SET_NASABAH_ACTION,
    payload:nasabah
  }
}
