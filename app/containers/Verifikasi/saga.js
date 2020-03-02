import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
// todo :
// import { api, apps } from environments;
import {
  VERIFIKASI_ACTION
} from './constants';

import {
  makeSelectUser
} from './selectors'

import {
  verifikasiSuccessAction,
  verifikasiErrorAction
} from './actions';

export function* requestVerifikasi(){
  const {
    nik,
    email,
    nomtel
  } = yield select(makeSelectUser());

  const metaData = JSON.stringify({
    userAgent: navigator.userAgent
  });

  // const endpoint `${api.host}/api/v${api.version}/auth/verifyUserToken`
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'APPLICATION-ID':apps['mps_pwa'].id
    },
    body: JSON.stringify({
      nik,
      email,
      nomtel,
      metaData
    })
  };

  try {
    console.log(metaData);
    // const response = yield call(request, endpoint, requestOpt);
    // hardcode test
    if(nik == "01540110"){
      // TODO : buat short limit token untuk verifikasi 
      // yield put(setVerifyUserToken(response.data));
      yield put(verifikasiSuccessAction()); 
    }
  } catch(err){
    // TODO : buat error message
    yield put(verifikasiErrorAction(err))
  }
}

// Individual exports for testing
export default function* verifikasiSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(VERIFIKASI_ACTION, requestVerifikasi);
}
