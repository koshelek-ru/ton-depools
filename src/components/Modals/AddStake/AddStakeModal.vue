<template>
  <v-row justify="center" v-show="isModalOpened">
    <add-stake-desktop-modal
      v-if="!isMobile"
      @set-is-modal-opened="setIsModalOpened"
      @set-is-valid="setIsValid"
      @proceed-stake="proceedStake"
      @update-login-data="updateLoginData"
      @set-amount="setStakeAmount"
      :isOpened="isModalOpened"
      :isValid="valid"
      :dePool="$props.dePool"
      :minStake="$props.minStake"
      :isStakeLoading="isStakeLoading"
      :stakeAmount="parseFloat(amount)"
    />
    <add-stake-mobile-modal
      v-else
      @set-is-modal-opened="setIsModalOpened"
      @set-is-valid="setIsValid"
      @proceed-stake="proceedStake"
      @update-login-data="updateLoginData"
      @set-amount="setStakeAmount"
      :isOpened="isModalOpened"
      :isValid="valid"
      :dePool="$props.dePool"
      :minStake="$props.minStake"
      :isStakeLoading="isStakeLoading"
      :stakeAmount="parseFloat(amount)"
    />
    <StakeResultsModal />
  </v-row>
</template>

<script>
  import StakeResultsModal from '@/components/Modals/StakeResults/StakeResultsModal.vue';
  import AddStakeDesktopModal from './desktop/AddStakeDesktopModal.vue';
  import AddStakeMobileModal from './mobile/AddStakeMobileModal.vue';
  import { mapState } from 'vuex';
  export default {
    name: 'AddStakeModal',
    data() {
      return {
        valid: false,
        address: null,
        publicKey: null,
        secretKey: null,
        seedPhrase: null,
        amount: null,
      };
    },
    components: {
      StakeResultsModal,
      AddStakeDesktopModal,
      AddStakeMobileModal,
    },
    props: {
      isOpened: Boolean,
      dePool: String,
      minStake: String,
    },
    computed: {
      isModalOpened: {
        get() {
          return this.isOpened;
        },
        set(v) {
          return this.$emit('open-modal', v);
        },
      },
      ...mapState(['isMobile', 'isStakeLoading', 'isTxSuccessful']),
    },
    watch: {
      minStake(n) {
        this.amount = parseFloat(n);
      },
      isTxSuccessful(n) {
        if (n) {
          this.isModalOpened = false;
        }
      },
    },
    methods: {
      updateLoginData({
        address = this.address,
        publicKey = this.publicKey,
        secretKey = this.secretKey,
        seedPhrase = this.seedPhrase,
      }) {
        this.address = address;
        this.publicKey = publicKey;
        this.secretKey = secretKey;
        this.seedPhrase = seedPhrase;
      },
      proceedStake() {
        this.$store.dispatch('addOrdinaryStake', {
          amount: this.amount,
          dest: this.dePool,
          src: this.address,
          seed: this.seedPhrase,
          keyPair: {
            public: this.publicKey,
            secret: this.secretKey,
          },
        });
      },
      setIsModalOpened(isOpened) {
        this.isModalOpened = isOpened;
      },
      setIsValid(isValid) {
        this.valid = isValid;
      },
      setStakeAmount(amount) {
        this.amount = amount;
      },
    },
  };
</script>
