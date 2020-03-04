/*
 *
 * VerifyConfirmPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_KODE_AKTIFASI_ACTION
} from './constants';

export const initialState = {
  kodeAktifasi:""
};

/* eslint-disable default-case, no-param-reassign */
const verifyConfirmPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {      
      case CHANGE_KODE_AKTIFASI_ACTION:{
        draft.kodeAktifasi = action.payload;
        return draft;
      }
    }
    return draft;
  });

export default verifyConfirmPageReducer;