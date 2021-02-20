<template>
  <section class="header-mobile">
    <v-btn
      color="grey"
      elevation="0"
      class="menu-btn"
      @click.stop="isNavOpened = !isNavOpened"
    >
      <v-icon>$vuetify.icons.menu</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="isNavOpened" app temporary>
      <div class="nav-container">
        <div>
          <div class="d-flex text-center">
            <v-btn
              block
              height="56px"
              elevation="0"
              margin="0"
              transition="scale-transition"
              tile
              color="primary"
              :to="{ name: 'Main' }"
              style="display: flex; justify-content: space-between"
              exact
            >
              <v-icon class="mr-2">$vuetify.icons.logo</v-icon>
              {{ $t('links.main') }}
            </v-btn>
          </div>
          <div class="d-flex text-center">
            <v-btn
              block
              height="56px"
              elevation="0"
              margin="0"
              transition="scale-transition"
              tile
              color="primary"
              active-class="drawer-link drawer-link--active"
              :to="
                $store.state.clientAddress !== ''
                  ? `/mystakes/${$store.state.clientAddress}`
                  : '/mystakes'
              "
              exact
              style="display: flex; justify-content: space-between"
            >
              <v-icon class="mr-2" v-text="'mdi-file-cabinet'"></v-icon>
              {{ $t('links.myStakes') }}
            </v-btn>
          </div>
          <div class="d-flex text-center mobile-item">
            <v-btn
              block
              height="56px"
              :href="$t('url.github')"
              target="_blank"
              elevation="0"
              margin="0"
              transition="scale-transition"
              tile
              style="display: flex; justify-content: space-between"
              class="drawer-link"
            >
              <v-icon class="mr-2">$vuetify.icons.github</v-icon>
              GitHub
            </v-btn>
          </div>

          <v-tooltip transition="scroll-y-reverse-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                class="d-flex justify-start text-center mt-4 mb-4 mobile-item"
                style="padding: 0 16px"
                v-bind="attrs"
                v-on="on"
              >
                <span
                  height="56px"
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    font-weight: 300;
                  "
                  color="transparent"
                  class="drawer-link text-center"
                >
                  <v-icon
                    class="mr-2"
                    color="dark"
                    v-text="'mdi-account-multiple'"
                  ></v-icon>
                  <span>
                    DePools:
                    {{ dePoolsAmount }}
                  </span>
                </span>
              </div>
            </template>
            <span>{{ $t('toolTip.depoolAmount') }}</span>
          </v-tooltip>
          <div class="text-center pt-2" style="padding: 0 16px">
            <locale-switcher />
          </div>
        </div>
        <div class="mb-1 mx-auto">
          <v-switch
            transition="scale-transition"
            height="56px"
            margin="0"
            style="width: 100%; padding: 0 1em"
            :label="$t('darkTheme')"
            inset
            tile
            v-model="isDark"
          >
          </v-switch>
        </div>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
  import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher.vue';
  export default {
    name: 'HeaderMobile',
    data() {
      return {
        isNavOpened: false,
      };
    },
    computed: {
      isDark: {
        set(v) {
          this.$emit('set-is-dark-theme', false, v);
        },
        get() {
          return this.theme;
        },
      },
    },
    components: {
      LocaleSwitcher,
    },
    props: ['dePoolsAmount', 'theme'],
  };
</script>

<style lang="scss" scoped>
  .nav-container {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .v-navigation-drawer {
    height: 100% !important;
  }
</style>
