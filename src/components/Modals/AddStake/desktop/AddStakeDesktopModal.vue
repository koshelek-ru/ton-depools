<template>
  <v-dialog
    v-model="isModalOpened"
    max-width="800px"
    transition="scroll-y-reverse-transition"
    overlay-opacity="0.4"
    overlay-color="#333"
  >
    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('sendStake') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="$t('depoolAddress')"
                  :value="$props.dePool"
                  readonly
                  disabled
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('stakeAmount') + '*'"
                  v-model="amount"
                  prepend-icon="mdi-diamond-outline"
                  :hint="$t('minStakeAmount', { amount: $props.minStake })"
                  persistent-hint
                  suffix="TON"
                  type="number"
                  :rules="[(v) => !!v || $t('rules.requiredField')]"
                  required
                >
                </v-text-field>
              </v-col>
              <LoginFields
                @updateLoginData="updateLoginData"
                :isModalOpened="isModalOpened"
              />
            </v-row>
          </v-container>
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
    name: 'AddStakeDesktopModal',
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
