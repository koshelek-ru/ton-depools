import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import store from '@/core/store';
import i18n from './i18n';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      logo: 'mdi-diamond-outline',
      github: 'mdi-github',
      theme: 'mdi-lightbulb-outline',
      menu: 'mdi-menu',
    },
  },
  theme: {
    dark: store.state.theme,
    themes: {
      light: {
        primary: '#0055F1',
        secondary: '#1A70FA',
        accent: '#FFF',
        error: '#b71c1c',
        light: '#fff',
        grey: '#f4f4f4',
        light_grey: '#FDFDFD',
        dark: '#212121',
        diamond: '#0083cd',
        disabled: '#FAF7FF',
        btn_primary: '#0055F1',
      },
      dark: {
        grey: '#323232',
        diamond: '#0083cd',
        modal_light: '#282828',
        light_grey: '#232323',
        accent: '#333',
      },
    },
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
});
