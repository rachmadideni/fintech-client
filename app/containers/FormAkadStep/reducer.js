/*
 *
 * FormAkadStep reducer
 *
 */
import produce from 'immer';
import {
  GET_OPSI_DOKUMEN_SUCCESS_ACTION,   
  CHANGE_STSKWN_ACTION,
  CHANGE_NMPSGN_ACTION,
  CHANGE_NOKTPP_ACTION,
  CHANGE_TGLHRP_ACTION,
  CHANGE_JMLANK_ACTION,
  ADD_UPLOADED_ACTION,
  RESET_FORM_SUCCESS_ACTION
} from './constants';

export const initialState = {
  data:{
      stskwn:1,    
      nmpsgn:"",
      noktpp:"",
      tglhrp:"",
      jmlank:0,
      uploaded:[]    
  },
  opsi:{
    dokumen:[]
  }
};

/* eslint-disable default-case, no-param-reassign */
const formAkadStepReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_FORM_SUCCESS_ACTION:{
        draft.data = action.payload;
        return draft;
      }
      case GET_OPSI_DOKUMEN_SUCCESS_ACTION:{
        draft.opsi.dokumen = action.payload;
        return draft;
      }
      case CHANGE_STSKWN_ACTION:{
        draft.data.stskwn = action.payload;
        break;
      }
      case CHANGE_NMPSGN_ACTION:{
        draft.data.nmpsgn = action.payload;
        break;
      }
      case CHANGE_NOKTPP_ACTION:{
        draft.data.noktpp = action.payload;
        break;
      }
      case CHANGE_TGLHRP_ACTION:{
        draft.data.tglhrp = action.payload;
        break;
      }
      case CHANGE_JMLANK_ACTION:{
        draft.data.jmlank = action.payload;
        break;
      }
      case ADD_UPLOADED_ACTION:{
        // draft.data.jmlank = action.payload;
        const { idberk, file, objectURL } = action.payload;
        let found_index = draft.data.uploaded.findIndex((elem) => elem.idberk === idberk);
        if(found_index > -1)
        {
          draft.data.uploaded[found_index].idberk = idberk;  
          draft.data.uploaded[found_index].file = file;
          draft.data.uploaded[found_index].objectURL = objectURL;
        } else {
          // case no item yet
          const arr = [];
          const obj = {};          
          obj["idberk"] = idberk;
          obj["file"] = file;
          obj['objectURL'] = objectURL;
          arr.push(obj);          
          draft.data.uploaded = draft.data.uploaded.concat(arr);
        }
        break;
      }
    }
    return draft;
  });

export default formAkadStepReducer;
