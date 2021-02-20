<template>
  <v-form v-model="valid" @submit.prevent="login" class="mx-auto login-form">
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('login') }}</span>
      </v-card-title>
      <v-card-text>
        <LoginFields
          v-if="isManageStakesOn"
          @updateLoginData="updateLoginData"
        />
        <v-container>
          <v-row>
            <v-col v-if="!isManageStakesOn" cols="12">
              <v-text-field
                :label="$t('address') + '*'"
                v-model="clientAddress"
                type="text"
                :rules="[(v) => !!v || $t('rules.requiredField')]"
                required
                clearable
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-checkbox
                v-model="isManageStakesOn"
                :label="$t('hint.manageStakes')"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          :disabled="valid === false"
          text
          @click="login"
        >
          {{ $t('btn.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import LoginFields from '@/components/LoginFields/LoginFields.vue';

  export default {
    name: 'Login',
    data() {
      return {
        clientAddress: '',
        clientSeed: '',
        clientPublicKey: '',
        clientSecretKey: '',
        valid: false,
        isManageStakesOn: false,
      };
    },
    components: {
      LoginFields,
    },
    methods: {
      login() {
        this.setClientAddress(this.clientAddress);
        this.setClientSeed(this.clientSeed);
        this.setClientPublicKey(this.clientPublicKey);
        this.setClientSecretKey(this.clientSecretKey);
        this.getClientStakes();
        this.setIsLoggedIn(true);
      },
      updateLoginData({
        address = this.clientAddress,
        publicKey = this.clientPublicKey,
        secretKey = this.clientSecretKey,
        seedPhrase = this.clientSeed,
      }) {
        this.clientAddress = address;
        this.clientPublicKey = publicKey;
        this.clientSecretKey = secretKey;
        this.clientSeed = seedPhrase;
      },
      ...mapActions(['getClientStakes']),
      ...mapMutations([
        'setIsLoggedIn',
        'setClientSecretKey',
        'setClientPublicKey',
        'setClientSeed',
        'setClientAddress',
        'resetClientLoginCredentials',
      ]),
    },
    created() {
      this.resetClientLoginCredentials();
    },
  };
</script>

<style lang="scss" scoped>
  .login-form {
    max-width: 700px;
    margin-top: 1em;
  }
</style>
