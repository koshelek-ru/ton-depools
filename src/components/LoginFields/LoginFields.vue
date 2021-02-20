<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="rm-pt-mt" v-if="noAddress === false">
        <v-text-field
          :label="`${$t('address')} (${$t('optional')})`"
          v-model="address"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="rm-pt-mt" v-if="isLoginWithKeys === false">
        <v-text-field
          :label="$t('seedPhrase') + '*'"
          v-model="seedPhrase"
          :rules="[
            (v) =>
              (!!v && v.split(' ').length === 12 && v[v.length - 1] !== ' ') ||
              (!!v && v.split('-').length === 12 && v[v.length - 1] !== '-')
                ? true
                : this.$t('rules.seedPhrase'),
          ]"
          :type="showSeed ? 'text' : 'password'"
          required
          :append-icon="showSeed ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showSeedPhrase"
        ></v-text-field>
      </v-col>
      <v-container
        style="padding-top: 0px !important; padding-bottom: 0px !important"
        v-else
      >
        <v-row>
          <v-col class="rm-pt-mt" cols="6">
            <v-text-field
              :label="$t('publicKey') + '*'"
              v-model="publicKey"
              :rules="[(v) => !!v || $t('rules.requiredField')]"
            ></v-text-field>
          </v-col>
          <v-col class="rm-pt-mt" cols="6">
            <v-text-field
              :label="$t('privateKey') + '*'"
              v-model="secretKey"
              :rules="[(v) => !!v || $t('rules.requiredField')]"
              :type="showSeed ? 'text' : 'password'"
              :append-icon="showSeed ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showSeedPhrase"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <div class="d-flex tools">
      <v-switch
        v-model="isLoginWithKeys"
        class="tools__item"
        transition="scale-transition"
        :label="$t('usingKeyPair')"
      ></v-switch>
      <v-select
        v-model="currentContract"
        :items="clientContracts"
        :label="currentContract"
        :hint="$t('hint.walletContract')"
        persistent-hint
        single-line
      ></v-select>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'LoginFields',
    data() {
      return {
        showSeed: false,
        isLoginWithKeys: false,
        seedPhraseRules: [],

        address: null,
        publicKey: null,
        secretKey: null,
        seedPhrase: null,
      };
    },
    props: {
      noAddress: Boolean,
      isModalOpened: Boolean,
    },
    computed: {
      clientContracts() {
        return this.$store.state.clientContracts;
      },
      currentContract: {
        set(contract) {
          this.$store.commit('setCurrentClientContract', contract);
        },
        get() {
          return this.$store.state.currentClientContract;
        },
      },
    },
    watch: {
      address(n) {
        this.updateLoginData({ address: n });
      },
      secretKey(n) {
        this.updateLoginData({ secretKey: n });
      },
      publicKey(n) {
        this.updateLoginData({ publicKey: n });
      },
      seedPhrase(n) {
        this.updateLoginData({ seedPhrase: n });
      },
      isModalOpened(n) {
        if (n) {
          this.seedPhrase = null;
        }
      },
    },
    methods: {
      updateLoginData({
        address = this.address,
        publicKey = this.publicKey,
        secretKey = this.secretKey,
        seedPhrase = this.seedPhrase,
      }) {
        this.$emit('updateLoginData', {
          address,
          publicKey,
          secretKey,
          seedPhrase: seedPhrase !== null ? seedPhrase.replace(/-/g, ' ') : '',
        });
      },
      showSeedPhrase() {
        this.showSeed = !this.showSeed;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .rm-pt-mt {
    padding-top: 0px;
    margin-top: 0px;
  }
  .tools {
    &__item {
      margin-right: 2em;
    }
  }
  @media screen and (max-width: 620px) {
    .tools {
      flex-wrap: wrap-reverse;
      &__item {
        margin-right: 1em;
      }
    }
  }
</style>
