/*
 *
 * FormPekerjaan actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_COMPANY_ACTION,
  CHANGE_COMPANY_JOINDATE_ACTION,
  GET_OPSI_SBU_ACTION,
  GET_OPSI_SBU_SUCCESS_ACTION
} from './constants';

export function getOpsiSbuAction(){
  return {
    type:GET_OPSI_SBU_ACTION
  }
}

export function getOpsiSbuSuccessAction(sbu){
  return {
    type:GET_OPSI_SBU_SUCCESS_ACTION,
    payload:sbu
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeCompanyAction(company) {
  return {
    type: CHANGE_COMPANY_ACTION,
    payload:company
  };
}

export function changeCompanyJoinDateAction(companyJoinDate) {
  return {
    type: CHANGE_COMPANY_JOINDATE_ACTION,
    payload:companyJoinDate
  };
}
