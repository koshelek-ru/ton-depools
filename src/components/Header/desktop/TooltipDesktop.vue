<template>
  <div class="main-tools ml-4">
    <v-tooltip transition="scroll-y-reverse-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          elevation="0"
          @click="$emit('switch-theme')"
          class="mr-1"
        >
          <v-icon
            small
            v-text="theme ? 'mdi-brightness-7' : 'mdi-weather-night'"
          ></v-icon>
        </v-btn>
      </template>
      <span>{{
        theme ? $t('toolTip.lightTheme') : $t('toolTip.darkTheme')
      }}</span>
    </v-tooltip>
    <locale-switcher />
  </div>
</template>

<script>
  import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher.vue';
  export default {
    name: 'TooltipDesktop',
    props: {
      theme: Boolean,
    },
    components: {
      LocaleSwitcher,
    },
  };
</script>

<style></style>
