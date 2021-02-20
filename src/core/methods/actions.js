import { TONClient } from 'ton-client-web-js';
import DePoolABI_V1 from '@/ABI/depool/DePoolV1.abi.json';
import DePoolABI_V2 from '@/ABI/depool/DePoolV2.abi.json';
import DePoolABI_V3 from '@/ABI/depool/DePoolV3.abi.json';
import SafeMultiSigABI from '@/ABI/SafeMultisigWallet.abi.json';
import SetCodeMultiSigABI from '@/ABI/SetCodeMultiSig.abi.json';
import i18n from '@/plugins/i18n';

const clientPkgs = [
  {
    contractName: 'SetCodeMultiSig 2',
    abi: SetCodeMultiSigABI,
    imageBase64:
      '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',
  },
  {
    contractName: 'SetCodeMultiSig',
    abi: SetCodeMultiSigABI,
    imageBase64:
      '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',
  },
  {
    contractName: 'SafeMultiSig',
    abi: SafeMultiSigABI,
    imageBase64:
      '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',
  },
];

import {
  convertNanoToTon,
  convertTonToNano,
  formatAddress,
} from '@/core/utils.js';

export default {
  async getTonClient({ commit }) {
    try {
      commit('setIsClientLoaded', false);
      const client = await TONClient.create({
        servers: ['main.ton.dev'],
      });
      commit('setTonClient', client);
      commit('setIsClientLoaded', true);
    } catch (e) {
      commit('setIsClientLoaded', false);
      console.error(e);
    }
  },
  async getDePoolABI({ state }, { version = 0, address = '' }) {
    try {
      const getAbiByVersion = (version) => {
        if (version === 1) {
          return DePoolABI_V1;
        } else if (version === 2) {
          return DePoolABI_V2;
        } else if (version === 3) {
          return DePoolABI_V3;
        }
      };
      const getAbiByAddress = (depools) => {
        let abiVersion;
        depools.forEach((depool) => {
          if (depool.fullAddress === address) {
            abiVersion = getAbiByVersion(depool.version);
          }
        });
        return abiVersion;
      };

      if (version !== 0) {
        return getAbiByVersion(version);
      } else {
        if (state.dePoolList.length > 0) {
          return getAbiByAddress(state.dePoolList);
        } else {
          const dePoolsRes = await fetch(
            `${process.env.VUE_APP_HOST}/api/depools`
          );
          const dePools = await dePoolsRes.json();
          return getAbiByAddress(dePools);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  async getKeyPairFromSeed({ state }, SEED) {
    try {
      const client = state.tonClient;
      const HD_PATH = "m/44'/396'/0'/0/0";
      return client.crypto.mnemonicDeriveSignKeys({
        dictionary: 1,
        wordCount: 12,
        phrase: SEED,
        path: HD_PATH,
      });
    } catch (e) {
      console.error(e);
    }
  },
  async getAddress({ state }, keys) {
    try {
      const client = state.tonClient;
      const pkg = clientPkgs.find(
        (pkg) => pkg.contractName === state.currentClientContract
      );
      const addressRes = await client.contracts.createDeployMessage({
        package: {
          abi: pkg.abi,
          imageBase64: pkg.imageBase64,
        },
        constructorParams: {
          owners: [`0x${keys.public}`],
          reqConfirms: 1,
        },
        keyPair: keys,
      });
      return addressRes.address;
    } catch (e) {
      console.error(e);
    }
  },
  async getBalance({ state }, address) {
    try {
      const tonClient = state.tonClient;
      const balanceRes = await tonClient.queries.accounts.query(
        {
          id: {
            eq: address,
          },
        },
        'balance'
      );
      return balanceRes;
    } catch (e) {
      console.error(e);
    }
  },
  async getClientStakes({ state, commit, dispatch }) {
    try {
      const tonClient = state.tonClient;
      const dePoolsRes = await fetch(`${process.env.VUE_APP_HOST}/api/depools`);
      const dePools = await dePoolsRes.json();
      let address = state.clientAddress;
      let clientStakes = [];

      if (address === null) {
        let keys = state.clientSeed
          ? await dispatch('getKeyPairFromSeed', state.clientSeed)
          : {
              public: state.clientPublicKey,
              secret: state.clientSecretKey,
            };
        address = await dispatch('getAddress', keys);
        commit('setClientAddress', address);
      }
      const participatedPools = [];
      const balanceRes = await dispatch('getBalance', address);
      balanceRes.length !== 0 &&
        commit('setClientBalance', balanceRes[0].balance);

      dePools.map((dePool) => {
        dePool.participants.map(
          (participant) =>
            participant === address && participatedPools.push(dePool)
        );
      });

      if (participatedPools.length > 0) {
        let decodedMsgBody = { function: '' };

        clientStakes = await Promise.all(
          await participatedPools.map(async (dePool) => {
            const DePoolABI = await dispatch('getDePoolABI', {
              version: dePool.version,
            });
            const stake = await tonClient.contracts.runLocal({
              address: dePool.address,
              functionName: 'getParticipantInfo',
              abi: DePoolABI,
              input: {
                addr: address,
              },
            });
            const depoolLastMsgs = await dispatch('getClientLastStakeMsg', {
              depoolAddress: dePool.address,
              clientAddress: address,
            });
            decodedMsgBody = await tonClient.contracts.decodeInputMessageBody({
              abi: DePoolABI,
              bodyBase64: depoolLastMsgs[0].body,
              internal: true,
            });
            return {
              ...stake.output,
              dePool: dePool.address,
              lastMessageFunction: decodedMsgBody.function,
            };
          })
        );
      }

      commit('setClientStakes', clientStakes);
      commit('setIsStakesLoaded', true);
    } catch (e) {
      commit('setClientStakes', []);
      commit('setIsStakesLoaded', true);
      console.error(e);
    }
  },
  async transactionFee({ dispatch }, address) {
    try {
      const balanceRes = await dispatch('getBalance', address);
      const balance = parseInt(balanceRes[0].balance, 16);
      const txFee = 500_000_000;
      const minFee = 20_000_000;
      if (balance >= txFee + minFee) {
        return txFee;
      } else {
        return balance - minFee;
      }
    } catch (e) {
      console.error(e);
    }
  },
  async getDePoolsData({ commit }) {
    try {
      const dePoolsRes = await fetch(`${process.env.VUE_APP_HOST}/api/depools`);
      const dePools = await dePoolsRes.json();

      const dePoolList = [];

      for await (let dePool of dePools) {
        const minStake = convertNanoToTon(dePool.minStake);
        const stakeFee = convertNanoToTon(dePool.stakeFee);
        const assurance = convertNanoToTon(dePool.assurance);
        const validatorReward = parseInt(dePool.validatorReward, 16);
        const rewardFraction = validatorReward;
        const address = formatAddress(dePool.address, 12, 54);
        const addressMobile = formatAddress(dePool.address, 5, 60);
        const validatorAddressMobile = formatAddress(
          dePool.validatorAddress,
          5,
          60
        ).short;
        const participantsAmount = dePool.participants.length;
        const dePoolClosed = dePool.poolClosed;
        const validatorAddress = formatAddress(dePool.validatorAddress, 8, 58);
        const customData = dePool.customData;
        const customName =
          dePool.customData.length > 0 ? dePool.customData[0].name : '';
        const customAvatarSrc =
          dePool.customData.length > 0
            ? `${process.env.VUE_APP_HOST}/api/depool-avatars/${
                dePool.customData[0].address.split(':')[1]
              }.png`
            : '';

        const rounds = dePool.rounds;
        const stakes = [];
        for (let round in rounds) {
          stakes.push(convertNanoToTon(rounds[round].stake));
        }
        const assets = stakes.reduce(
          (acc, curr) => parseFloat(acc) + parseFloat(curr)
        );
        const version = dePool.version;

        dePoolList.push({
          address: address.short,
          addressMobile: addressMobile.short,
          fullAddress: address.full,
          validatorAddress: validatorAddress.short,
          fullValidatorAddress: validatorAddress.full,
          validatorAddressMobile,
          rewardFraction,
          minStake,
          stakeFee,
          assurance,
          participantsAmount,
          assets,
          dePoolClosed,
          customName,
          customAvatarSrc,
          customData,
          version,
          rounds,
        });
      }

      commit('setDePoolList', dePoolList);
      commit('setDePoolsAmount', dePools.length);
    } catch (e) {
      console.error(e);
    }
  },
  async withdrawPart(
    { state, commit, dispatch },
    { dest, amount, seed, keyPair }
  ) {
    try {
      commit('setIsWithdrawLoading', true);
      const client = state.tonClient;
      const DePoolABI = await dispatch('getDePoolABI', { address: dest });
      amount = convertTonToNano(amount);
      const src = state.clientAddress;
      const fee = await dispatch('transactionFee', src);
      const clientAbi = clientPkgs.find(
        (pkg) => pkg.contractName === state.currentClientContract
      ).abi;
      let keys = seed ? await dispatch('getKeyPairFromSeed', seed) : keyPair;

      const message = await client.contracts.createRunBody({
        abi: DePoolABI,
        function: 'withdrawPart',
        params: {
          withdrawValue: amount,
        },
        internal: true,
      });

      const runMessage = await client.contracts.createRunMessage({
        address: src,
        abi: clientAbi,
        functionName: 'submitTransaction',
        input: {
          dest: dest,
          payload: message.bodyBase64,
          value: amount + fee,
          allBalance: false,
          bounce: true,
        },
        keyPair: keys,
      });

      const messageProcessingState = await client.contracts.sendMessage(
        runMessage.message
      );

      const result = await client.contracts.waitForRunTransaction(
        runMessage,
        messageProcessingState
      );

      commit('setStakeAdresses', {
        src: src,
        dePoolAddress: dest,
      });

      if (typeof result.fees !== 'undefined') {
        commit('setStakeResults', result);
        commit('setIsWithdrawLoading', false);
        commit('setAlertText', i18n.t('withdrawalSuccessfullyCompleted'));
        commit('setShowAlert', true);
        commit('setIsTxSuccessful', true);
      }
    } catch (e) {
      commit('setIsTxSuccessful', false);
      commit('setIsWithdrawLoading', false);
      commit('setAlertText', e.message);
      commit('setShowAlert', true);
      console.error(e);
    }
  },
  async withdrawAll({ state, commit, dispatch }, { dest, seed, keyPair }) {
    try {
      commit('setIsWithdrawLoading', true);
      const client = state.tonClient;
      const src = state.clientAddress;
      const DePoolABI = await dispatch('getDePoolABI', { address: dest });
      const clientAbi = clientPkgs.find(
        (pkg) => pkg.contractName === state.currentClientContract
      ).abi;
      let keys = seed ? await dispatch('getKeyPairFromSeed', seed) : keyPair;

      const message = await client.contracts.createRunBody({
        abi: DePoolABI,
        function: 'withdrawAll',
        params: {},
        internal: true,
      });

      const runMessage = await client.contracts.createRunMessage({
        address: src,
        abi: clientAbi,
        functionName: 'submitTransaction',
        input: {
          dest: dest,
          payload: message.bodyBase64,
          value: await dispatch('transactionFee', src),
          allBalance: false,
          bounce: true,
        },
        keyPair: keys,
      });

      const messageProcessingState = await client.contracts.sendMessage(
        runMessage.message
      );

      const result = await client.contracts.waitForRunTransaction(
        runMessage,
        messageProcessingState
      );

      commit('setStakeAdresses', {
        src: src,
        dePoolAddress: dest,
      });

      if (typeof result.fees !== 'undefined') {
        commit('setStakeResults', result);
        commit('setIsWithdrawLoading', false);
        commit('setAlertText', i18n.t('withdrawalSuccessfullyCompleted'));
        commit('setShowAlert', true);
        commit('setIsTxSuccessful', true);

        const clientStakes = state.clientStakes.slice();
        clientStakes.forEach((stake, i) => {
          if (stake.dePool === dest) {
            clientStakes[i].lastMessageFunction = 'withdrawAll';
          }
        });
        commit('setClientStakes', clientStakes);
      }
    } catch (e) {
      commit('setIsTxSuccessful', false);
      commit('setIsWithdrawLoading', false);
      commit('setAlertText', e.message);
      commit('setShowAlert', true);
      console.error(e);
    }
  },
  async addOrdinaryStake(
    { state, commit, dispatch },
    { amount, dest, src, seed, keyPair }
  ) {
    try {
      commit('setIsStakeLoading', true);
      const client = state.tonClient;
      const DePoolABI = await dispatch('getDePoolABI', { address: dest });
      let keys = seed ? await dispatch('getKeyPairFromSeed', seed) : keyPair;
      let address =
        src === null || src === '' ? await dispatch('getAddress', keys) : src;
      const clientAbi = clientPkgs.find(
        (pkg) => pkg.contractName === state.currentClientContract
      ).abi;
      amount = convertTonToNano(amount);
      const fee = await dispatch('transactionFee', address);

      const message = await client.contracts.createRunBody({
        abi: DePoolABI,
        function: 'addOrdinaryStake',
        params: {
          stake: amount,
        },
        internal: true,
      });

      const runMessage = await client.contracts.createRunMessage({
        address,
        abi: clientAbi,
        functionName: 'submitTransaction',
        input: {
          dest: dest,
          payload: message.bodyBase64,
          value: amount + fee,
          allBalance: false,
          bounce: true,
        },
        keyPair: keys,
      });

      const messageProcessingState = await client.contracts.sendMessage(
        runMessage.message
      );

      const result = await client.contracts.waitForRunTransaction(
        runMessage,
        messageProcessingState
      );

      commit('setStakeAdresses', {
        src: address,
        dePoolAddress: dest,
      });

      if (typeof result.transaction !== 'undefined') {
        commit('setStakeResults', result);
        commit('setIsTxSuccessful', true);
        commit('setShowAlert', true);
        commit('setIsStakeLoading', false);
      }
    } catch (e) {
      console.error(e);
      commit('setIsTxSuccessful', false);
      commit('setIsStakeLoading', false);
      commit('setAlertText', e.message);
      commit('setShowAlert', true);
    }
  },
  async getClientLastStakeMsg({ state }, { depoolAddress, clientAddress }) {
    try {
      const client = state.tonClient;
      const msgData = await client.queries.messages.query(
        {
          src: {
            eq: clientAddress,
          },
          dst: {
            eq: depoolAddress,
          },
        },
        `
          id
          created_at
          msg_type_name
          value
          body
        `,
        [{ path: 'created_at', direction: 'DESC' }]
      );
      return msgData;
    } catch (e) {
      console.error(e);
    }
  },
};
