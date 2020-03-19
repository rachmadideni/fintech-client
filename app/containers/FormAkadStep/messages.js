/*
 * FormAkadStep Messages
 *
 * This contains all the text for the FormAkadStep container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormAkadStep';

export default defineMessages({  
  form_title: {
    id: `${scope}.form_title`,
    defaultMessage: 'form akad',
  },
  status_pernikahan: {
    id: `${scope}.status_pernikahan`,
    defaultMessage: 'status pernikahan',
  },
  nmpsgn: {
    id: `${scope}.nmpsgn`,
    defaultMessage: 'nama pasangan',
  },
  noktpp: {
    id: `${scope}.noktpp`,
    defaultMessage: 'no ktp pasangan',
  },
  tglhrp: {
    id: `${scope}.tglhrp`,
    defaultMessage: 'tanggal lahir pasangan',
  },
  jmlank: {
    id: `${scope}.jmlank`,
    defaultMessage: 'jumlah tanggungan',
  },
  nmberk: {
    id: `${scope}.nmberk`,
    defaultMessage: 'upload kartu keluarga',
  },
  empty_nmpsgn:{
    id: `${scope}.empty_nmpsgn`,
    defaultMessage: 'nama pasangan wajib diisi',
  },
  empty_noktpp:{
    id: `${scope}.empty_noktpp`,
    defaultMessage: 'nomor ktp pasangan wajib diisi',
  },
  empty_tglhrp:{
    id: `${scope}.empty_tglhrp`,
    defaultMessage: 'tanggal lahir pasangan wajib diisi',
  },
  btnSubmit:{
    id: `${scope}.btnSubmit`,
    defaultMessage: 'submit form',
  },
});
