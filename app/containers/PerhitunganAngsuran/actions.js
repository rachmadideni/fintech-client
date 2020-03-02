/*
 *
 * PerhitunganAngsuran actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_GAJI_ACTION,
  CHANGE_PLAFON_ACTION,
  CHANGE_TENOR_ACTION,
  CHANGE_ANGSURAN_ACTION,
  SET_LIMIT_ANGSURAN_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeGajiAction(gaji) {
  return {
    type: CHANGE_GAJI_ACTION,
    payload:gaji
  };
}

export function changePlafonAction(plafon) {
  return {
    type: CHANGE_PLAFON_ACTION,
    payload:plafon
  };
}

export function changeTenorAction(tenor) {
  return {
    type: CHANGE_TENOR_ACTION,
    payload:tenor
  };
}

export function changeAngsuranAction(angsuran) {
  return {
    type: CHANGE_ANGSURAN_ACTION,
    payload:angsuran
  };
}

export function setLimitAngsuranAction(maxAngs) {
  return {
    type: SET_LIMIT_ANGSURAN_ACTION,
    payload:maxAngs
  };
}
