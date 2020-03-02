/*
 * Verifikasi Messages
 *
 * This contains all the text for the Verifikasi container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Verifikasi';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Verifikasi akun',
  },
  nik:{
    id:`${scope}.nik`,
    defaultMessage:'Nomor Induk Karyawan'
  },
  email:{
    id:`${scope}.email`,
    defaultMessage:'email'
  },
  nomorTelpon:{
    id:`${scope}.nomorTelpon`,
    defaultMessage:'nomor telpon'
  },
  btnVerifikasi:{
    id:`${scope}.btnVerifikasi`,
    defaultMessage:'proses'
  },
  goBack:{
    id:`${scope}.goBack`,
    defaultMessage:'kembali'
  }
});
