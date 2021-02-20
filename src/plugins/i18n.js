import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../../locales/en';
import ru from '../../locales/ru';

Vue.use(VueI18n);

const messages = {
  en,
  ru,
};

const locale = localStorage.getItem('locale') || navigator.language;

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  silentTranslationWarn: true,
  messages,
});

export default i18n;
