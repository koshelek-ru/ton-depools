<template>
  <div>
    <withdraw-results-desktop
      v-if="!isMobile"
      @set-is-modal-opened="setIsModalOpened"
      @close-modal="closeModal"
      @open-snackbar="openSnackbar"
      :isOpened="isModalOpened"
      :withdrawResultsData="{
        stakeOutput,
        stakeAccountFees,
        isStakeSuccessful,
        stakeTxId,
        stakeDate,
        dePoolAddress,
        clientAddress,
      }"
    />
    <withdraw-results-mobile
      v-else
      @set-is-modal-opened="setIsModalOpened"
      @close-modal="closeModal"
      @open-snackbar="openSnackbar"
      :isOpened="isModalOpened"
      :withdrawResultsData="{
        stakeOutput,
        stakeAccountFees,
        isStakeSuccessful,
        stakeTxId,
        stakeDate,
        dePoolAddress,
        clientAddress,
      }"
    />
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex';
  import WithdrawResultsDesktop from './desktop/WithdrawResultsDesktop.vue';
  import WithdrawResultsMobile from './mobile/WithdrawResultsMobile.vue';
  export default {
    name: 'WithdrawResultsModal',
    data() {
      return {
        isModalOpened: false,
        snackbar: false,
      };
    },
    components: {
      WithdrawResultsDesktop,
      WithdrawResultsMobile,
    },
    computed: {
      ...mapGetters([
        'stakeOutput',
        'stakeAccountFees',
        'isStakeSuccessful',
        'stakeDate',
        'stakeTxId',
        'dePoolAddress',
        'clientAddress',
      ]),
      ...mapState(['isMobile', 'isTxSuccessful']),
    },
    watch: {
      isTxSuccessful() {
        this.isModalOpened = this.isTxSuccessful;
      },
      isModalOpened() {
        if (this.isModalOpened === false) {
          this.setShowAlert(false);
          setTimeout(() => {
            this.setIsTxSuccessful(false);
          }, 1000);
        }
      },
    },
    methods: {
      closeModal() {
        this.isModalOpened = false;
      },
      openSnackbar() {
        this.setShowSnackbar(true);
      },
      setIsModalOpened(isOpened) {
        this.isModalOpened = isOpened;
      },
      ...mapMutations(['setShowSnackbar', 'setIsTxSuccessful', 'setShowAlert']),
    },
  };
</script>

<style lang="scss">
  .stake-results__row {
    border-bottom: 1px solid #c4c4c4;
  }
</style>
