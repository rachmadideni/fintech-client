/*
 * UserDashboard Messages
 *
 * This contains all the text for the UserDashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserDashboard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserDashboard container!',
  },
  btnPengajuan:{
    id: `${scope}.btnPengajuan`,
    defaultMessage: 'mulai pengajuan',    
  },
  noApplicationYet:{
    id: `${scope}.noApplicationYet`,
    defaultMessage: 'anda belum memiliki pengajuan pembiayaan',    
  },
  pembiayaanMultiGuna:{
    id: `${scope}.pembiayaanMultiGuna`,
    defaultMessage: 'klik tombol dibawah untuk memulai',    
  }
});
