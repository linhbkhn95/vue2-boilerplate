/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
} from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem('id_token');
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
    }
  },

  [REGISTER]() {
    //
  },

  [LOGIN](state, token) {
    state.authenticated = true;
    state.fullname = 'linhtd';
    localStorage.setItem('id_token', token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  [SET_CURRENT_USER](state, meta) {
    state.authenticated = true;
    state.user = meta;
    console.log('metaaa', meta);
    Vue.$http.defaults.headers.common.Authorization = '';
  },
  [LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem('id_token');
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
