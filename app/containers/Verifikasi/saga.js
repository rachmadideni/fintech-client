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
  makeSelectUser  
} from './selectors'

import {
  verifikasiSuccessAction,
  verifikasiErrorAction
} from './actions';

import {
  setEmailAction,
  setNikAction
} from '../App/actions';

export function* requestVerifikasi(){
  
  const { nik, email, nomtel } = yield select(makeSelectUser());
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
    if(response.status && response.data > 0){
      
      yield put(verifikasiSuccessAction(response.token_verifikasi, response.kode_verifikasi, false));
      yield put(setEmailAction(email));
      yield put(setNikAction(nik));
      yield call(setTokenVerifikasi, response.token_verifikasi);
      yield put(replace('/verifikasi/confirm')); // jika sukses mengirim request verifikasi. otomatis redirect utk memasukkan kode     
    
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

export default function* verifikasiSaga(){
  yield all([
    takeLatest(VERIFIKASI_ACTION, requestVerifikasi),
  ]);
}