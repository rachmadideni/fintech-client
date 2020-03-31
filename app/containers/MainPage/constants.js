/*
 *
 * MainPage constants
 *
 */
import { 
    AddBoxOutlined,
    InfoOutlined
  } from '@material-ui/icons';

export const DEFAULT_ACTION = 'app/MainPage/DEFAULT_ACTION';
export const CHANGE_STEP_ACTION = 'app/MainPage/CHANGE_STEP_ACTION';
export const CEK_PINJAMAN_ACTION = 'app/MainPage/CEK_PINJAMAN_ACTION';
export const CEK_PINJAMAN_SUCCESS_ACTION = 'app/MainPage/CEK_PINJAMAN_SUCCESS_ACTION';

export const DOWNLOAD_AKAD_ACTION = 'app/MainPage/DOWNLOAD_AKAD_ACTION';
export const DOWNLOAD_AKAD_SUCCESS_ACTION = 'app/MainPage/DOWNLOAD_AKAD_SUCCESS_ACTION';

export const DOWNLOAD_SPN_ACTION = 'app/MainPage/DOWNLOAD_SPN_ACTION';
export const DOWNLOAD_SPN_SUCCESS_ACTION = 'app/MainPage/DOWNLOAD_SPN_SUCCESS_ACTION';

export const DOWNLOAD_SRP_ACTION = 'app/MainPage/DOWNLOAD_SRP_ACTION';
export const DOWNLOAD_SRP_SUCCESS_ACTION = 'app/MainPage/DOWNLOAD_SRP_SUCCESS_ACTION';

export const DOWNLOAD_SPGK_ACTION = 'app/MainPage/DOWNLOAD_SPGK_ACTION';
export const DOWNLOAD_SPGK_SUCCESS_ACTION = 'app/MainPage/DOWNLOAD_SPGK_SUCCESS_ACTION';

export const ITEMS = [{
    'step':1,
    'name':'pinjaman',
    'icon':AddBoxOutlined,
    'active':true
  },
  {
    'step':2,
    'name':'informasi',
    'icon':InfoOutlined,
    'active':true
  }];