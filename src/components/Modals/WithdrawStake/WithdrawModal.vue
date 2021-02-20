<template>
  <div>
    <withdraw-modal-desktop
      v-if="!isMobile"
      @set-is-modal-opened="setIsModalOpened"
      @set-is-valid="setIsValid"
      @withdraw-stake="withdrawStake"
      @set-is-withdraw-all="setIsWithdrawAll"
      @update-login-data="updateLoginData"
      @set-withdraw-amount="setWithdrawAmount"
      :isOpened="isModalOpened"
      :isValid="valid"
      :isAll="isWithdrawAll"
      :isWithdrawLoading="isWithdrawLoading"
      :stakedValue="stakedValue"
    />
    <withdraw-modal-mobile
      v-else
      @set-is-modal-opened="setIsModalOpened"
      @set-is-valid="setIsValid"
      @withdraw-stake="withdrawStake"
      @set-is-withdraw-all="setIsWithdrawAll"
      @update-login-data="updateLoginData"
      @set-withdraw-amount="setWithdrawAmount"
      :isOpened="isModalOpened"
      :isValid="valid"
      :isAll="isWithdrawAll"
      :isWithdrawLoading="isWithdrawLoading"
      :stakedValue="stakedValue"
    />
    <WithdrawResultsModal />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import WithdrawModalDesktop from './desktop/WithdrawModalDesktop.vue';
  import WithdrawModalMobile from './mobile/WithdrawModalMobile.vue';
  import WithdrawResultsModal from '@/components/Modals/WithdrawResults/WithdrawResultsModal.vue';

  export default {
    name: 'WithdrawModal',
    data() {
      return {
        valid: false,
        amount: null,
        isWithdrawAll: false,

        seedPhrase: null,
        publicKey: null,
        secretKey: null,
      };
    },
    components: {
      WithdrawModalDesktop,
      WithdrawModalMobile,
      WithdrawResultsModal,
    },
    props: {
      isOpened: Boolean,
      value: Number,
      stakedValue: Number,
      dePool: String,
    },
    computed: {
      isModalOpened: {
        set(v) {
          return this.$emit('set-modal', v);
        },
        get() {
          return this.isOpened;
        },
      },
      ...mapState([
        'isMobile',
        'isTxSuccessful',
        'isWithdrawLoading',
        'clientSeed',
        'clientPublicKey',
        'clientSecretKey',
      ]),
    },
    watch: {
      value(n) {
        if (!isNaN(n)) {
          this.amount = n;
        }
        if (this.amount >= this.$props.stakedValue) {
          this.isWithdrawAll = true;
        } else {
          this.isWithdrawAll = false;
        }
      },
      isWithdrawAll(n) {
        if (n) {
          this.amount = this.$props.stakedValue;
        }
      },
      isTxSuccessful(n) {
        if (n) {
          this.isModalOpened = false;
        }
      },
    },
    methods: {
      withdrawStake() {
        if (this.isWithdrawAll || this.amount >= this.$props.stakedValue) {
          this.withdrawAll({
            dest: this.$props.dePool,
            amount: this.amount,
            seed: this.clientSeed || this.seedPhrase,
            keyPair: {
              public: this.clientPublicKey || this.publicKey,
              secret: this.clientSecretKey || this.secretKey,
            },
          });
        } else {
          this.withdrawPart({
            dest: this.$props.dePool,
            amount: this.amount,
            seed: this.clientSeed || this.seedPhrase,
            keyPair: {
              public: this.clientPublicKey || this.publicKey,
              secret: this.clientSecretKey || this.secretKey,
            },
          });
        }
      },
      updateLoginData({
        publicKey = this.publicKey,
        secretKey = this.secretKey,
        seedPhrase = this.seedPhrase,
      }) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;
        this.seedPhrase = seedPhrase;
      },
      setIsModalOpened(isOpened) {
        this.isModalOpened = isOpened;
      },
      setIsValid(isValid) {
        this.valid = isValid;
      },
      setIsWithdrawAll(isWithdrawAll) {
        this.isWithdrawAll = isWithdrawAll;
      },
      setWithdrawAmount(amount) {
        this.amount = amount;
      },
      ...mapActions(['withdrawAll', 'withdrawPart']),
    },
  };
</script>
