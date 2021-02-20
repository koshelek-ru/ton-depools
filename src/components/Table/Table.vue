<template>
  <div>
    <v-card color="light_grey" rounded="lg">
      <v-card-title
        style="padding: 0px; padding-bottom: 1px"
        background-color="primary"
      >
        <v-text-field
          v-model="search"
          single-line
          filled
          clearable
          background-color="transparent"
          append-icon="mdi-magnify"
          :label="$t('search')"
          hide-details
        ></v-text-field>
      </v-card-title>
      <table-desktop
        v-if="isMobile === false"
        @open-modal="openModal"
        @open-snackbar="openSnackbar"
        :dePoolList="dePoolList"
        :isDePoolsLoading="isDePoolListLoading"
        :search="search"
      />
      <table-mobile
        v-else
        @open-modal="openModal"
        @open-snackbar="openSnackbar"
        :dePoolList="dePoolList"
        :isDePoolsLoading="isDePoolListLoading"
        :search="search"
      />
    </v-card>
    <StakeModal
      @open-modal="openModal"
      :isOpened="isModalOpened"
      :dePool="destAddress"
      :minStake="minStake"
    />
  </div>
</template>

<script>
  import StakeModal from '@/components/Modals/AddStake/AddStakeModal.vue';
  import TableDesktop from './desktop/TableDesktop.vue';
  import TableMobile from './mobile/TableMobile.vue';
  import { mapState } from 'vuex';

  export default {
    name: 'Table',
    components: {
      StakeModal,
      TableDesktop,
      TableMobile,
    },
    data() {
      return {
        isModalOpened: false,
        destAddress: null,
        minStake: null,
        search: this.$route.params.dePoolAddress,
      };
    },
    methods: {
      openModal(value, address = null, minStake = null) {
        this.isModalOpened = value;
        if (value === true) {
          this.destAddress = address;
          this.minStake = minStake;
        }
      },
      openSnackbar() {
        this.$store.commit('setShowSnackbar', true);
      },
    },
    computed: {
      isDePoolListLoading() {
        if (this.dePoolList.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      ...mapState(['isMobile', 'dePoolList']),
    },
    watch: {
      search(n) {
        if (
          typeof n !== 'undefined' &&
          n !== this.$router.currentRoute.params.dePoolAddress
        ) {
          if (n === '' || n === null) {
            this.$router.push({
              name: 'Main',
            });
            return;
          }
          this.$router.push({
            name: 'SearchDePool',
            params: { dePoolAddress: n },
          });
        }
      },
      $route(to, from) {
        if (
          this.search !== to.params.dePoolAddress &&
          from.params.dePoolAddress !== to.params.dePoolAddress
        ) {
          this.search = to.params.dePoolAddress;
        }
      },
    },
  };
</script>

<style lang="scss">
  .table-row-flex {
    display: flex;
    align-items: center;
  }
</style>
