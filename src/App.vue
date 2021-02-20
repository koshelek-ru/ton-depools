<template>
  <v-app id="inspire">
    <v-container style="padding-top: 0">
      <Header />
      <v-main app>
        <v-fade-transition hide-on-leave mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-main>
      <v-snackbar
        v-if="showAlert"
        v-model="showAlert"
        timeout="4000"
        class="snackbar snackbar--alert snackbar--status"
        :color="isTxSuccessful ? 'success' : 'error'"
        bottom
      >
        {{ stakeAlertText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="#fff"
            text
            v-bind="attrs"
            @click="$store.commit('setShowAlert', false)"
          >
            {{ $t('btn.close') }}
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        timeout="1000"
        class="snackbar snackbar--alert snackbar--copy"
        top
        v-model="isSnackbarOpened"
      >
        {{ $t('snackbar.copied') }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
  import Header from '@/components/Header/Header.vue';
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
  export default {
    name: 'App',
    components: {
      Header,
    },
    data() {
      return {
        isMobile: false,
        width: window.innerWidth,
      };
    },
    methods: {
      checkIfMobile() {
        if (this.width <= 860) {
          this.$store.commit('setIsMobile', true);
          return (this.isMobile = true);
        } else {
          this.$store.commit('setIsMobile', false);
          return (this.isMobile = false);
        }
      },
      handleResize() {
        this.width = window.innerWidth;
        this.checkIfMobile();
      },
      ...mapMutations(['setShowSnackbar', 'setShowAlert']),
      ...mapActions(['getDePoolsData', 'getTonClient']),
    },
    computed: {
      ...mapState(['isClientLoaded', 'isTxSuccessful', 'dePoolList']),
      ...mapGetters(['stakeAlertText']),
      isSnackbarOpened: {
        get() {
          return this.$store.state.isSnackbarOpened;
        },
        set(v) {
          this.setShowSnackbar(v);
        },
      },
      showAlert: {
        get() {
          return this.$store.state.showAlert;
        },
        set(v) {
          this.setShowAlert(v);
        },
      },
    },
    watch: {
      isClientLoaded() {
        if (this.isClientLoaded && this.dePoolList.length === 0) {
          this.getDePoolsData();
        }
      },
      $route(to) {
        document.title = to.meta.title || 'FreeTON Staking';
      },
    },
    created() {
      this.getTonClient();
      window.addEventListener('resize', this.handleResize);
      this.checkIfMobile();
      if (this.isClientLoaded && this.dePoolList.length === 0) {
        this.getDePoolsData();
      }
    },
  };
</script>

<style lang="scss">
  * {
    font-family: 'Roboto', sans-serif;
    scrollbar-width: thin;
  }
  a {
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
  }
  #inspire {
    position: relative;
  }
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    font-display: swap;
  }
  .copy-id {
    &:hover {
      opacity: 0.7;
    }
  }
  .centered-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .snackbar {
    position: fixed;
    &--alert {
      bottom: 30px;
    }
    &--status {
      top: unset !important;
    }
  }
  .skeleton-box {
    display: inline-block;
    height: 1em;
    position: relative;
    overflow: hidden;
    background-color: #333;
    border-radius: 8px;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#333, 0) 0,
        rgba(#333, 0.2) 20%,
        rgba(#333, 0.5) 60%,
        rgba(#333, 0)
      );
      animation: shimmer 5s infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
</style>
