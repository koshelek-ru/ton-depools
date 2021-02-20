<template>
  <v-menu
    offset-y
    rounded="lg"
    transition="slide-y-transition"
    :close-on-click="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <span class="d-flex justify-space-between" style="width: 100%">
        <v-icon v-text="'mdi-web'"></v-icon>
        <v-btn elevation="0" v-bind="attrs" v-on="on">
          {{ currentLocale }}
        </v-btn>
      </span>
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
    name: 'LocaleSwitcherMobile',
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
