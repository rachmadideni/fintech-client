import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';

import {
  VERIFIKASI_ACTION
} from './constants';

import {
  setTokenVerifikasi,
  removeTokenVerifikasi
} from '../Login/helpers';

import {
  makeSelectUser,
  makeSelectTokenVerifikasi
} from './selectors'

import {
  verifikasiSuccessAction,
  verifikasiErrorAction
} from './actions';

import {
  setEmailAction
} from '../App/actions';

export function* requestVerifikasi(){
  
  const { nik, email, nomtel } = yield select(makeSelectUser());

  // const metaData = JSON.stringify({
  //   userAgent: navigator.userAgent
  // });

  const endpoint = `${api.host}/api/verifikasi_user`
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik,
      email,
      nomohp:nomtel
    })
  };
  
  try {
    
    const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    if(response.status && response.data > 1){
      yield put(verifikasiSuccessAction(response.token_verifikasi, response.kode_verifikasi, false));
      yield put(setEmailAction(email));
      yield call(setTokenVerifikasi, response.token_verifikasi);
      yield put(replace('/verifikasi/confirm'));// jika sukses mengirim request verifikasi. otomatis redirect utk memasukkan kode     
    } else {
      yield put(setEmailAction(email));
      yield put(replace('/login'));
    }
    
  } catch(err){
    // TODO : buat error message
    console.log(err);
    yield put(verifikasiErrorAction(err))
  }
}

export default function* verifikasiSaga() {
  yield all([
    takeLatest(VERIFIKASI_ACTION, requestVerifikasi),
  ]);
}
