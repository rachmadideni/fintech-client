/*
 * Verifikasi Messages
 *
 * This contains all the text for the Verifikasi container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Verifikasi';

export default defineMessages({
  verifikasi: {
    id: `${scope}.header`,
    defaultMessage: 'Verifikasi user',
  },
  nik:{
    id:`${scope}.nik`,
    defaultMessage:'NIK'
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
    defaultMessage:'proses verifikasi'
  },
  btnCancel:{
    id:`${scope}.btnCancel`,
    defaultMessage:'Batal'
  },
  goBack:{
    id:`${scope}.goBack`,
    defaultMessage:'kembali'
  },
  emptyNik:{
    id:`${scope}.emptyNik`,
    defaultMessage:'NIK wajib diisi'
  },
  emptyEmail:{
    id:`${scope}.emptyEmail`,
    defaultMessage:'alamat email wajib diisi'
  },
  wrongEmailFormat:{
    id:`${scope}.wrongEmailFormat`,
    defaultMessage:'format email salah'
  },
  emptyNomorTelpon:{
    id:`${scope}.emptyNomorTelpon`,
    defaultMessage:'nomor telpon wajib diisi'
  },
  pleaseWaitIsLoading:{
    id:`${scope}.pleaseWaitIsLoading`,
    defaultMessage:'mohon tunggu\n sedang melakukan verifikasi'
  }
});
