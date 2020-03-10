/*
 *
 * FormSubmissionStep reducer
 *
 */
import produce from 'immer';
import { 
  SET_COMPLETED_STEP_ACTION,
  SET_ACTIVE_STEP,
  SET_NASABAH_ACTION
} from './constants';

import {
  PLAFON,
  TENOR
} from '../PerhitunganAngsuran/constants';

// INSTALLMENT
import {
  CHANGE_GAJI_ACTION,
  CHANGE_PLAFON_ACTION,
  CHANGE_TENOR_ACTION,
  CHANGE_ANGSURAN_ACTION,
  SET_LIMIT_ANGSURAN_ACTION
} from '../PerhitunganAngsuran/constants';

import {
  CHANGE_FULLNAME_ACTION,
  CHANGE_BIRTHPLACE_ACTION,
  CHANGE_BIRTHDATE_ACTION,
  CHANGE_ADDRESS_ACTION,
  CHANGE_GENDER_ACTION,
  VALIDATE_INPUT_ACTION,
  CHANGE_VALIDATION_MESSAGE_ACTION,
  CHANGE_TRIGGERED_ACTION
} from '../FormNasabah/constants';

import {
  CHANGE_COMPANY_ACTION,
  CHANGE_COMPANY_JOINDATE_ACTION
} from '../FormPekerjaan/constants';

import {
  CHANGE_DOKUMEN_KTP_ACTION,
  CHANGE_DOKUMEN_IDCARD_ACTION,
  UPLOAD_DOKUMEN_ACTION,
  ADD_DOKUMEN_ACTION
} from '../FormDocument/constants';

import {
  CHANGE_JENIS_PENGAJUAN_ACTION,
  CHANGE_SUB_PENGAJUAN_ACTION,
  CHANGE_PEMANFAATAN_LAIN_ACTION
} from '../FormPengajuan/constants';

import messages from './messages';

export const initialState = {
  activeStep:0,
  stepProgress:0,
  completedStep:[
    {
      number:1,
      title:messages.step1Title,
      subtitle:messages.step1Subtitle,      
      isActive:false,      
      stepValue:0,
      validated:false,
    },
    {
      number:2,
      title:messages.step2Title,
      subtitle:messages.step2Subtitle,
      isActive:false,
      stepValue:0,
      validated:false,
    },
    {
      number:3,
      title:messages.step3Title,
      subtitle:messages.step3Subtitle,
      isActive:false,
      stepValue:0,
      validated:false,
    },
    {
      number:4,
      title:messages.step4Title,
      subtitle:messages.step4Subtitle,
      isActive:false,
      stepValue:0,
      validated:false,
    },
    {
      number:5,
      title:messages.step5Title,
      subtitle:messages.step5Subtitle,
      isActive:false,
      stepValue:0,
      validated:false,
    }
  ],
  data:{    
    angsuran:{
      pendapatan:0,
      plafon:Math.min(...PLAFON),
      margin:10,
      tenor:Math.min(...TENOR),
      angsuran:0,
      limit_angsuran:0
    },
    nasabah:{
      fullname:"",
      birthplace:"",
      birthdate:"",
      address:"",
      gender:"",
      error:{
        fullname:null,
        birthplace:null,
        birthdate:null,
        address:null,
        gender:null,
      },
      isSubmitTriggered:false
    },
    work:{
      company:"",
      companyJoinDate:"",
    },
    documents:{
      imageKTP:null,
      imageIdCard:null,
      ktp:null,
      idcard:null,
      npwp:null
    },
    pengajuan:{
      jenis:"1",
      tujuan:"",
      pemanfaatan_lain:""
    }
  },
  opsi:{
    plafon:[],
    tenor:[],
    jenis_kelamin:[],
    sbu:[],
    sub_pengajuan:[],
    dokumen:[]
  }
};

/* eslint-disable default-case, no-param-reassign */
const formSubmissionStepReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COMPLETED_STEP_ACTION:{
        let arr = draft.completedStep;
        
        let indexTobeUpdated = arr.findIndex((el)=>el.isActive === false);
        draft.completedStep[indexTobeUpdated].isActive = action.payload.isActive;
        draft.completedStep[indexTobeUpdated].stepValue = action.payload.stepValue;
        
        // let indexTobeUpdated = arr.findIndex((el)=>el.isActive === !action.payload.isActive);
        // draft.completedStep[indexTobeUpdated].isActive = action.payload.isActive;
        // draft.completedStep[indexTobeUpdated].stepValue = action.payload.stepValue;
        
        break;
      }

      case SET_ACTIVE_STEP:{
        if(draft.activeStep < draft.completedStep.length){
          // decrement step
          if(action.payload === -1){
            draft.activeStep = draft.activeStep + action.payload;
            draft.stepProgress = draft.stepProgress - 100/draft.completedStep.length;  
          }else{
            // increment
            draft.activeStep = draft.activeStep + action.payload;
            draft.stepProgress = draft.stepProgress + 100/draft.completedStep.length;  
          }
        }
        break;
      }
      
      case SET_NASABAH_ACTION:{
        draft.data.nasabah.fullname = action.payload.fullname;
        draft.data.nasabah.birthplace = action.payload.birthplace;
        draft.data.nasabah.birthdate = action.payload.birthdate;
        draft.data.nasabah.address = action.payload.address;
        draft.data.nasabah.gender = action.payload.gender;
        break;
      }

      case CHANGE_GAJI_ACTION:{
        draft.data.angsuran.pendapatan = action.payload;
        return draft;
        // break;
      }
      
      case CHANGE_PLAFON_ACTION:{
        draft.data.angsuran.plafon = action.payload;
        break;
      }
      
      case CHANGE_TENOR_ACTION:{
        draft.data.angsuran.tenor = action.payload;
        break;
      }
      
      case CHANGE_ANGSURAN_ACTION:{
        draft.data.angsuran.angsuran = action.payload;
        break;
      }
      
      case SET_LIMIT_ANGSURAN_ACTION:{
        draft.data.angsuran.limit_angsuran = action.payload;
        break;
      }

      case CHANGE_FULLNAME_ACTION:{
        draft.data.nasabah.fullname = action.payload;
        return draft;
      }
      
      case CHANGE_BIRTHPLACE_ACTION:{
        draft.data.nasabah.birthplace = action.payload;
        return draft;
      }
      
      case CHANGE_BIRTHDATE_ACTION:{
        draft.data.nasabah.birthdate = action.payload;
        return draft;
      }
      
      case CHANGE_ADDRESS_ACTION:{
        draft.data.nasabah.address = action.payload;
        return draft;
      }
      
      case CHANGE_GENDER_ACTION:{
        draft.data.nasabah.gender = action.payload;
        return draft;
      }

      case VALIDATE_INPUT_ACTION:{
        // draft.data.nasabah.error[action.payload.inputName] = action.payload.inputValue;
        return draft;
      }

      case CHANGE_VALIDATION_MESSAGE_ACTION:{
        draft.data.nasabah.error[action.payload.inputName] = action.payload.errorMessage;
        return draft;
      }

      case CHANGE_TRIGGERED_ACTION:{
        draft.data.nasabah.isSubmitTriggered = action.payload;
        return draft;
      }

      case CHANGE_COMPANY_ACTION:{
        draft.data.work.company = action.payload;
        return draft;
      }
      
      case CHANGE_COMPANY_JOINDATE_ACTION:{
        draft.data.work.companyJoinDate = action.payload;
        return draft;
      }

      // case CHANGE_DOKUMEN_KTP_ACTION:{
      //   draft.data.documents.imageKTP = action.payload;
      //   return draft;
      // }
      
      // case CHANGE_DOKUMEN_IDCARD_ACTION:{
      //   draft.data.documents.imageIdCard = action.payload;
      //   return draft;
      // }

      case ADD_DOKUMEN_ACTION:{
        draft.data.documents[action.payload.key] = action.payload.file;
        return draft;
      }

      case CHANGE_JENIS_PENGAJUAN_ACTION:{
        draft.data.pengajuan.jenis = action.payload;
        return draft;
      }
      
      case CHANGE_SUB_PENGAJUAN_ACTION:{
        draft.data.pengajuan.tujuan = action.payload;
        return draft;
      }
      
      case CHANGE_PEMANFAATAN_LAIN_ACTION:{
        draft.data.pengajuan.pemanfaatan_lain = action.payload;
        return draft;
      }

    }
    return draft;
  });

export default formSubmissionStepReducer;
