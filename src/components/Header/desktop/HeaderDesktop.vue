<template>
  <section class="header-desktop d-flex align-center">
    <v-tooltip transition="scroll-y-reverse-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <span text v-bind="attrs" v-on="on" class="menu-item">
          <span style="font-weight: 300">
            {{ dePoolsAmount }}
            <v-icon
              class="ml-1"
              color="dark"
              v-text="'mdi-account-multiple'"
            ></v-icon>
          </span>
        </span>
      </template>
      <span>{{ $t('toolTip.depoolAmount') }}</span>
    </v-tooltip>
    <v-btn :href="$t('url.github')" target="_blank" text class="menu-link ml-1">
      <span class="mr-2">GitHub</span>
      <v-icon>$vuetify.icons.github</v-icon>
    </v-btn>
    <section class="menu-links">
      <v-btn
        text
        :to="
          $store.state.clientAddress !== ''
            ? `/mystakes/${$store.state.clientAddress}`
            : '/mystakes'
        "
        exact
        v-show="$route.name === 'Main' || $route.name === 'SearchDePool'"
      >
        {{ $t('links.myStakes') }}
      </v-btn>
      <v-btn
        text
        to="/"
        exact
        v-show="
          $route.name === 'MyStakes' || $route.name === 'MyStakesLoggedIn'
        "
      >
        {{ $t('links.main') }}
      </v-btn>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'HeaderDesktop',
    props: ['dePoolsAmount'],
  };
</script>
