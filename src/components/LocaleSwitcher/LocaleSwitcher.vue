<template>
  <span>
    <locale-switcher-mobile
      v-if="isMobile"
      @switch-locale="switchLocale"
      :currentLocale="currentLocale"
      :selectableLocales="selectableLocales"
    />
    <locale-switcher-desktop
      v-else
      @switch-locale="switchLocale"
      :currentLocale="currentLocale"
      :selectableLocales="selectableLocales"
    />
  </span>
</template>

<script>
  import LocaleSwitcherDesktop from './desktop/LocaleSwitcherDesktop.vue';
  import LocaleSwitcherMobile from './mobile/LocaleSwitcherMobile.vue';
  export default {
    components: { LocaleSwitcherMobile, LocaleSwitcherDesktop },
    name: 'LocaleSwitcher',
    data() {
      return {
        locales: ['en', 'ru'],
      };
    },
    methods: {
      switchLocale(locale) {
        if (this.$i18n.locale !== locale) {
          this.$i18n.locale = locale;
        }
        localStorage.setItem('locale', locale);
      },
    },
    computed: {
      currentLocale() {
        if (this.$i18n.locale.includes('en')) {
          return 'en';
        } else {
          return 'ru';
        }
      },
      selectableLocales() {
        return this.locales.filter((locale) => locale !== this.currentLocale);
      },
      isMobile() {
        return this.$store.state.isMobile;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
