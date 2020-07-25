import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { api } from "environments";
import request from "utils/request";

import { CEK_NIK_DAN_EMAIL, MINTA_KODE_RESET, KIRIM_EMAIL } from "./constants";
import { cekNikDanEmailResult, logSuccessMessage, mintaKodeResetSelesai, kirimEmailResult } from "./actions";
import { makeSelectKodeReset } from "./selectors";

export function* cekNikdanEmail(action){
  const endpoint = `${api.host}/api/cekUserByNikDanEmail`;
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik:action.payload.nik,
      email:action.payload.email
    })
  }
  try {
    const response = yield call(request, endpoint, requestOpt);        
    // if response sukses
    if(response && response.status){
      yield put(cekNikDanEmailResult(true, null));
      yield put(logSuccessMessage("silahkan cek email anda untuk kode reset password"));
      const kodeResetResponse = yield call(mintaKodeReset, action.payload.email);
      if(kodeResetResponse && kodeResetResponse.status){
        yield put(mintaKodeResetSelesai(kodeResetResponse.kode_reset));
      }

      const kirimEmailResponse = yield call(kirimEmail, action.payload.email);
      if(kirimEmailResponse && kirimEmailResponse.status){
        yield put(kirimEmailResult());
      }
      
    } else {
      yield put(cekNikDanEmailResult(false, "user dengan nik & email tsb tidak ada!"));
      yield put(logSuccessMessage(null));
    }
  } catch(err){

  }
} 

export function* mintaKodeReset(email){
  const endpoint = `${api.host}/api/mintaKodeReset`;
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({      
      email:email
    })
  }

  try {
    const response = yield call(request, endpoint, requestOpt);
    return response;
  } catch(err) {

  }
}

export function* kirimEmail(email){
  // kirimKodeResetKeEmail
  const kodeReset = yield select(makeSelectKodeReset());
  const endpoint = `${api.host}/api/kirimKodeResetKeEmail`;
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      kode_reset:kodeReset,     
      email:email
    })
  }

  try {
    const response = yield call(request, endpoint, requestOpt);
    return response;
  } catch(err) {

  }
}

export default function* forgotPasswordSaga() {
  yield all([
    takeLatest(CEK_NIK_DAN_EMAIL, cekNikdanEmail),
    takeLatest(MINTA_KODE_RESET, mintaKodeReset),
    takeLatest(KIRIM_EMAIL, kirimEmail)
  ])
}
