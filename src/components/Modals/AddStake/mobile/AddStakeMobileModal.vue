<template>
  <v-dialog
    v-model="isModalOpened"
    fullscreen
    persistent
    transition="scroll-y-reverse-transition"
  >
    <v-form v-model="valid" style="height: 100%">
      <v-card style="min-height: 100vh">
        <v-card-title>
          <span class="headline mt-2">{{ $t('sendStake') }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-textarea
                :hint="$t('depoolAddress')"
                persistent-hint
                auto-grow
                rows="1"
                readonly
                disabled
                :value="$props.dePool"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :label="$t('stakeAmount')"
                v-model="amount"
                prepend-inner-icon="mdi-diamond-outline"
                :hint="$t('minStakeAmount', { amount: $props.minStake })"
                suffix="TON"
                persistent-hint
                type="number"
                :rules="[(v) => !!v || $t('rules.requiredField')]"
                required
              >
              </v-text-field>
            </v-col>
            <LoginFields @updateLoginData="updateLoginData" />
          </v-row>
          <small>*{{ $t('hint.required') }}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isModalOpened = false">
            {{ $t('btn.close') }}
          </v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="valid === false"
            text
            @click="proceedStake"
            :loading="isStakeLoading"
          >
            {{ $t('btn.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import LoginFields from '@/components/LoginFields/LoginFields.vue';
  export default {
    name: 'AddStakeMobileModal',
    props: {
      isOpened: Boolean,
      isValid: Boolean,
      dePool: String,
      minStake: String,
      isStakeLoading: Boolean,
      stakeAmount: Number,
    },
    components: {
      LoginFields,
    },
    computed: {
      isModalOpened: {
        get() {
          return this.isOpened;
        },
        set(v) {
          this.$emit('set-is-modal-opened', v);
        },
      },
      valid: {
        get() {
          return this.isValid;
        },
        set(v) {
          this.$emit('set-is-valid', v);
        },
      },
      amount: {
        get() {
          return this.stakeAmount;
        },
        set(v) {
          this.$emit('set-amount', v);
        },
      },
    },
    methods: {
      proceedStake() {
        this.$emit('proceed-stake');
      },
      updateLoginData(data) {
        this.$emit('update-login-data', data);
      },
    },
  };
</script>
