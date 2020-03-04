/*
 * VerifyConfirmPage Messages
 *
 * This contains all the text for the VerifyConfirmPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VerifyConfirmPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Konfirmasi kode aktifasi',
  },
  kodeAktifasi: {
    id: `${scope}.kodeAktifasi`,
    defaultMessage: 'Kode Aktifasi',
  },
  emptyCode: {
    id: `${scope}.emptyCode`,
    defaultMessage: 'Kode Aktifasi wajib diisi',
  },
  btnConfirm: {
    id: `${scope}.btnConfirm`,
    defaultMessage: 'Konfirmasi kode',
  },
});
