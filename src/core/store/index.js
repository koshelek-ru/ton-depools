import Vue from 'vue';
import Vuex from 'vuex';
import actions from '@/core/methods/actions.js';
import mutations from '@/core/methods/mutations.js';
import i18n from '@/plugins/i18n';

import { convertNanoToTon, formatAddress } from '@/core/utils.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tonClient: null,
    isClientLoaded: false,
    theme:
      localStorage.getItem('isDarkTheme') !== null
        ? JSON.parse(localStorage.getItem('isDarkTheme'))
        : true,

    isMobile: false,
    isMenuOpened: false,
    isTxSuccessful: false,
    showAlert: false,
    isSnackbarOpened: false,
    isLoggedIn: false,
    isStakeLoading: false,
    isWithdrawLoading: false,
    isStakesLoaded: false,

    dePoolAddress: '',
    stakeResults: {},
    dePoolList: [],
    dePoolsAmount: '-',
    alertText: '',

    clientStakes: [],
    clientAddress: '',
    clientBalance: null,
    clientSeed: '',
    clientPublicKey: '',
    clientSecretKey: '',
    currentClientContract: 'SetCodeMultiSig 2',
    clientContracts: ['SetCodeMultiSig 2', 'SetCodeMultiSig', 'SafeMultiSig'],
  },
  getters: {
    clientAddress: (state) => {
      if (state.clientAddress.length > 0) {
        if (state.isMobile) {
          return formatAddress(state.clientAddress, 8, 62);
        } else {
          return formatAddress(state.clientAddress);
        }
      } else {
        return { short: '', full: '' };
      }
    },
    dePoolAddress: (state) => {
      if (state.dePoolAddress.length > 0) {
        if (state.isMobile) {
          return formatAddress(state.dePoolAddress, 8, 62);
        } else {
          return formatAddress(state.dePoolAddress);
        }
      } else {
        return { short: '', full: '' };
      }
    },
    stakeAlertText: (state) => {
      if (state.isTxSuccessful) {
        return i18n.t('yourStakeHasBeenSent');
      } else {
        return state.alertText;
      }
    },
    stakeOutput: (state) => {
      if (
        typeof state.stakeResults.fees !== 'undefined' &&
        typeof state.stakeResults.fees.totalOutput !== 'undefined'
      ) {
        return convertNanoToTon(state.stakeResults.fees.totalOutput);
      } else {
        return null;
      }
    },
    stakeAccountFees: (state) => {
      if (
        typeof state.stakeResults.fees !== 'undefined' &&
        typeof state.stakeResults.fees.totalAccountFees !== 'undefined'
      ) {
        return convertNanoToTon(state.stakeResults.fees.totalAccountFees);
      } else {
        return '';
      }
    },
    isStakeSuccessful: (state) => {
      if (typeof state.stakeResults.transaction !== 'undefined') {
        if (state.stakeResults.transaction.aborted === false) {
          return 'Success';
        } else {
          return 'Fail';
        }
      } else {
        return null;
      }
    },
    stakeDate: (state) => {
      if (
        typeof state.stakeResults.transaction !== 'undefined' &&
        typeof state.stakeResults.transaction.now !== 'undefined'
      ) {
        const unixTimestamp = state.stakeResults.transaction.now;
        const ms = unixTimestamp * 1000;
        const dateObject = new Date(ms);
        const date = dateObject.toLocaleString('ru-RU');
        return date;
      } else {
        return null;
      }
    },
    stakeTxId: (state) => {
      if (typeof state.stakeResults.transaction !== 'undefined') {
        if (state.isMobile) {
          return formatAddress(state.stakeResults.transaction.id, 8, 62);
        } else {
          return formatAddress(state.stakeResults.transaction.id);
        }
      } else {
        return { short: '', full: '' };
      }
    },
  },
  actions,
  mutations,
  modules: {},
});
