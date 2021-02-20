<template>
  <div>
    <stake-results-desktop-modal
      v-if="!isMobile"
      @set-is-modal-opened="setIsModalOpened"
      @close-modal="closeModal"
      @open-snackbar="openSnackbar"
      :isOpened="isModalOpened"
      :stakeResultsData="{
        stakeOutput,
        stakeAccountFees,
        clientAddress,
        stakeDate,
        stakeTxId,
        dePoolAddress,
        isStakeSuccessful,
      }"
    />
    <stake-results-mobile-modal
      v-else
      @set-is-modal-opened="setIsModalOpened"
      @close-modal="closeModal"
      @open-snackbar="openSnackbar"
      :isOpened="isModalOpened"
      :stakeResultsData="{
        stakeOutput,
        stakeAccountFees,
        clientAddress,
        stakeDate,
        stakeTxId,
        dePoolAddress,
        isStakeSuccessful,
      }"
    />
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex';
  import StakeResultsDesktopModal from './desktop/StakeResultsDesktopModal.vue';
  import StakeResultsMobileModal from './mobile/StakeResultsMobileModal.vue';
  export default {
    name: 'StakeResultsModal',
    data() {
      return {
        isModalOpened: false,
        snackbar: false,
      };
    },
    components: {
      StakeResultsDesktopModal,
      StakeResultsMobileModal,
    },
    computed: {
      ...mapState(['isTxSuccessful', 'isMobile']),
      ...mapGetters([
        'stakeOutput',
        'stakeAccountFees',
        'isStakeSuccessful',
        'stakeDate',
        'stakeTxId',
        'dePoolAddress',
        'clientAddress',
      ]),
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
      ...mapMutations(['setIsTxSuccessful', 'setShowAlert', 'setShowSnackbar']),
    },
  };
</script>

<style lang="scss">
  .stake-results__row {
    border-bottom: 1px solid #c4c4c4;
  }
</style>
