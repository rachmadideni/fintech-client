import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { 
  LOGIN_ACTION,
  TEST_TOKEN_LOGIN
} from './constants';

import {
  REMOVE_AUTH_TOKEN_ACTION
} from '../App/constants';

import {
  makeSelectCredential
} from '../Login/selectors';
import { setAuthTokenAction } from '../App/actions';
import {
  loginSuccessAction,
  loginErrorAction
} from './actions';

import { 
  setTokenInStorage,
  removeTokenInStorage
} from './helpers';

export function* login(){
  try {
    const { nik, password } = yield select(makeSelectCredential());
    const metadata = JSON.stringify({
      userAgent: navigator.userAgent,
    });

    // call login api
    // const endpoint `${api.host}/api/v${api.version}/auth/login`
    const requestOpt = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        //'APPLICATION-ID':apps['mps_pwa'].id
      },
      body: JSON.stringify({
        nik,
        password,        
        metadata
      })
    };

    // response dari login api
    // const response = yield call(request, endpoint, requestOpt);
    if(nik == "01540110"){
      // console.log(nik);
      // TODO : buat auth token untuk login 
      // yield put(setVerifyUserToken(response.data));
      yield call(setTokenInStorage, TEST_TOKEN_LOGIN);// store token di local storage
      yield put(setAuthTokenAction(TEST_TOKEN_LOGIN));// store token di state
      yield put(loginSuccessAction()); // beritahu store 
    }
  } catch(err){
    console.log(err);
    yield put(loginErrorAction(err));
  }
}

export function* logout(){
  try {
    yield call(removeTokenInStorage, 'token'); 
  } catch(err){
    console.log(err);
  }
}

export default function* loginSaga() {
  yield all([
    takeLatest(LOGIN_ACTION, login),
    takeLatest(REMOVE_AUTH_TOKEN_ACTION, logout)
  ]);
}
