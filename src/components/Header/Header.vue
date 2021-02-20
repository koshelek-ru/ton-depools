<template>
  <v-row justify="center" class="header-wrapper">
    <v-col cols="12" style="padding: 0">
      <v-sheet
        color="transparent"
        class="main-container d-flex justify-space-between"
        style="padding: 1em 0"
      >
        <div class="logo d-flex align-center">
          <a
            :href="$t('url.logo')"
            target="_blank"
            rel="noopener noreferrer"
            style="display: flex"
          >
            <img
              svg-inline
              class="logo-icon__img"
              src="../../assets/logo.svg"
              alt="koshelek.ru"
            />
          </a>
          <h2>
            Free TON <span style="font-weight: 300">DePools Staking</span>
          </h2>
          <tooltip-desktop
            v-if="!isMobile"
            @switch-theme="switchTheme"
            :theme="theme"
          />
        </div>
        <div class="menu">
          <header-desktop v-if="!isMobile" :dePoolsAmount="dePoolsAmount" />
          <header-mobile
            v-else
            @set-is-nav-opened="setIsNavOpened"
            @set-is-dark-theme="switchTheme"
            :theme="theme"
            :dePoolsAmount="dePoolsAmount"
          />
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import HeaderDesktop from './desktop/HeaderDesktop.vue';
  import TooltipDesktop from './desktop/TooltipDesktop.vue';
  import HeaderMobile from './mobile/HeaderMobile.vue';

  export default {
    name: 'Header',
    data() {
      return {
        theme: this.$store.state.theme,
      };
    },
    components: { TooltipDesktop, HeaderDesktop, HeaderMobile },
    computed: {
      dePoolsAmount() {
        return this.$store.state.dePoolsAmount;
      },
      isMobile() {
        return this.$store.state.isMobile;
      },
    },
    methods: {
      switchTheme(isBtn = true, theme) {
        if (isBtn) {
          this.theme = !this.theme;
        } else {
          this.theme = theme;
        }
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('isDarkTheme', this.theme);
      },
      setIsNavOpened() {
        this.isNavOpened = !this.isNavOpened;
      },
    },
  };
</script>

<style lang="scss">
  .header-wrapper {
    padding: 1em 24px;
  }
  img.logo-icon__img {
    width: 32px;
    height: 27px;
  }
  .logo {
    h2 {
      margin-left: 0.5em;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-links {
    padding-left: 0.5em;
    margin-left: 0.5em;
    border-left: 2px solid #c4c4c4;
    a {
      letter-spacing: normal;
      text-transform: capitalize;
    }
  }
  .nav-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  .menu-item {
    margin-right: 5px !important;
    background: transparent !important;
  }
  .drawer-link {
    &--active {
      opacity: 1 !important;
    }
  }
  .mobile-item {
    visibility: hidden;
  }
  @media screen and (max-width: 860px) {
    .header-wrapper {
      padding: 0.7em 5px;
    }
    img.logo-icon__img {
      width: 36px;
      height: 27px;
    }
    .header-wrapper .main-container {
      padding: 12px !important;
    }
    .menu-item {
      display: none !important;
    }
    .menu-btn {
      padding: 0 10px !important;
      min-width: auto !important;
    }
    .logo {
      font-size: 0.9rem;
      margin-right: 1.5em;
      line-height: 1.3;
    }
    .mobile-item {
      visibility: visible;
    }
  }
  @media screen and (max-width: 320px) {
    .logo {
      font-size: 0.8rem;
    }
  }
</style>
