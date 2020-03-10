/*
 *
 * FormPengajuan actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_JENIS_PENGAJUAN_ACTION,
  CHANGE_SUB_PENGAJUAN_ACTION,
  CHANGE_PEMANFAATAN_LAIN_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeJenisPengajuanAction(jenisPengajuan){
  return {
    type: CHANGE_JENIS_PENGAJUAN_ACTION,
    payload:jenisPengajuan
  }
}

export function changeSubPengajuanAction(subPengajuan){
  return {
    type: CHANGE_SUB_PENGAJUAN_ACTION,
    payload:subPengajuan
  }
}

export function changePemanfaatanLainAction(data){
  return {
    type:CHANGE_PEMANFAATAN_LAIN_ACTION,
    payload:data
  }
}
