/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_AUTH_TOKEN_ACTION = 'App/SET_AUTH_TOKEN_ACTION';
export const REMOVE_AUTH_TOKEN_ACTION = 'App/REMOVE_AUTH_TOKEN_ACTION';

export const SET_TOKEN_VERIFIKASI_ACTION = 'App/SET_TOKEN_VERIFIKASI_ACTION';
export const REMOVE_TOKEN_VERIFIKASI_ACTION = 'App/REMOVE_TOKEN_VERIFIKASI_ACTION';

export const SET_NIK_ACTION = 'App/SET_NIK_ACTION';
export const SET_EMAIL_ACTION = 'App/SET_EMAIL_ACTION';