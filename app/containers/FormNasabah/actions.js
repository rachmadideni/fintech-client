/*
 *
 * FormNasabah actions
 *
 */

import { 
  CHANGE_FULLNAME_ACTION,
  CHANGE_BIRTHPLACE_ACTION,
  CHANGE_BIRTHDATE_ACTION,
  CHANGE_ADDRESS_ACTION,
  CHANGE_GENDER_ACTION,
  VALIDATE_INPUT_ACTION,
  CHANGE_VALIDATION_MESSAGE_ACTION,
  CHANGE_TRIGGERED_ACTION
} from './constants';

export function changeFullnameAction(fullname) {
  return {
    type: CHANGE_FULLNAME_ACTION,
    payload:fullname
  };
}

export function changeBirthplaceAction(birthplace) {
  return {
    type: CHANGE_BIRTHPLACE_ACTION,
    payload:birthplace
  };
}

export function changeBirthdateAction(birthdate) {
  return {
    type: CHANGE_BIRTHDATE_ACTION,
    payload:birthdate
  };
}

export function changeAddressAction(address) {
  return {
    type: CHANGE_ADDRESS_ACTION,
    payload:address
  };
}

export function changeGenderAction(gender) {
  return {
    type: CHANGE_GENDER_ACTION,
    payload:gender
  };
}

export function validateInputAction(inputName,inputValue) {
  return {
    type: VALIDATE_INPUT_ACTION,
    payload:{
      inputName,
      inputValue
    }
  };
}

export function changeValidationMessageAction(inputName, errorMessage){
  return {
    type: CHANGE_VALIDATION_MESSAGE_ACTION,
    payload:{
      inputName,
      errorMessage
    }
  }
}

export function changeTriggeredAction(value){
  return {
    type:CHANGE_TRIGGERED_ACTION,
    payload:value
  }
}