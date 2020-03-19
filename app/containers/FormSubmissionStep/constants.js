/*
 *
 * FormSubmissionStep constants
 *
 */

export const DEFAULT_ACTION = 'app/FormSubmissionStep/DEFAULT_ACTION';
export const FORM_STEPS = [
    {        
        title:'simulasi cicilan',
        subtitle:'inputan sesuai kondisi pada saat pengajuan pinjaman'
    },
    {
        title:'Personal Details',
        subtitle:'isi ki form utk data personal ta'
    },
    {
        title:'Work',
        subtitle:'isiki form data pekerjaan ta'
    },
    {
        title:'Dokumen',
        subtitle:'upload ki dokumen / foto ta'
    }
]

export const SET_COMPLETED_STEP_ACTION = 'app/FormSubmissionStep/SET_COMPLETED_STEP_ACTION';
export const SET_ACTIVE_STEP = 'app/FormSubmissionStep/SET_ACTIVE_STEP';
export const SET_NASABAH_ACTION = 'app/FormSubmissionStep/SET_NASABAH_ACTION';
export const SET_PEKERJAAN_ACTION = 'app/FormSubmissionStep/SET_PEKERJAAN_ACTION';
export const SET_DOKUMEN_ACTION = 'app/FormSubmissionStep/SET_DOKUMEN_ACTION';

export const MAP_PENGAJUAN_ACTION = 'app/FormSubmissionStep/MAP_PENGAJUAN_ACTION';
export const MAP_PENGAJUAN_SUCCESS_ACTION = 'app/FormSubmissionStep/MAP_PENGAJUAN_SUCCESS_ACTION';

export const INSERT_CIF_ACTION = 'app/FormSubmissionStep/INSERT_CIF_ACTION';
export const INSERT_CIF_SUCCESS_ACTION = 'app/FormSubmissionStep/INSERT_CIF_SUCCESS_ACTION';

export const SUBMIT_PENGAJUAN_ACTION = 'app/FormSubmissionStep/SUBMIT_PENGAJUAN_ACTION';
export const SUBMIT_PENGAJUAN_SUCCESS_ACTION = 'app/FormSubmissionStep/SUBMIT_PENGAJUAN_SUCCESS_ACTION';

export const RESET_FORM_ACTION = 'app/FormSubmissionStep/RESET_FORM_ACTION';
export const RESET_FORM_SUCCESS_ACTION = 'app/FormSubmissionStep/RESET_FORM_SUCCESS_ACTION';
