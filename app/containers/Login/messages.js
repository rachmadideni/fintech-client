/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login',
  },
  loginButton:{
    id:`${scope}.loginButton`,
    defaultMessage:'Login'
  },
  verificationButton:{
    id:`${scope}.verificationButton`,
    defaultMessage:'Verifikasi akun'
  },
  forgotPasswordText:{
    id:`${scope}.forgotPasswordText`,
    defaultMessage:'lupa password ?'
  },
  resetPasswordButton:{
    id:`${scope}.resetPasswordButton`,
    defaultMessage:'Reset Password'
  },
  email:{
    id:`${scope}.email`,
    defaultMessage:'email'
  },
  password:{
    id:`${scope}.password`,
    defaultMessage:'password'
  },
  accountNotVerified:{
    id:`${scope}.accountNotVerified`,
    defaultMessage:'akun anda belum terverifikasi ? '
  },
  NotVerifiedRoute:{
    id:`${scope}.NotVerifiedRoute`,
    defaultMessage:'/verifikasi'
  }
});
