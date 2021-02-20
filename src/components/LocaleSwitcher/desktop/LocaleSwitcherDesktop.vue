<template>
  <v-menu
    offset-y
    rounded="lg"
    transition="slide-y-transition"
    :close-on-click="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" v-bind="attrs" v-on="on">
        {{ currentLocale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in selectableLocales"
        :key="locale"
        @click="switchLocale(locale)"
        style="text-transform: uppercase"
      >
        {{ locale }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'LocaleSwitcherDesktop',
    props: {
      currentLocale: String,
      selectableLocales: Array,
    },
    methods: {
      switchLocale(locale) {
        this.$emit('switch-locale', locale);
      },
    },
  };
</script>
