<template>
  <v-dialog
    v-model="isModalOpened"
    max-width="600px"
    transition="scroll-y-reverse-transition"
    overlay-opacity="0.4"
    overlay-color="#333"
  >
    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('withdrawStake') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span style="font-size: 1rem" class="d-flex align-center">
                  <span class="text--primary mr-1">
                    {{ $t('available') }}:
                  </span>
                  {{ formatValue($props.stakedValue) }}
                  <v-icon
                    v-text="'mdi-diamond'"
                    color="diamond"
                    class="ml-1"
                    small
                  ></v-icon>
                </span>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('amount') + '*'"
                  v-model="amount"
                  prepend-icon="mdi-diamond-outline"
                  suffix="TON"
                  type="number"
                  :rules="[(v) => !!v || $t('rules.requiredField')]"
                  required
                >
                </v-text-field>
              </v-col>
              <LoginFields
                v-if="!$store.state.clientSeed"
                @updateLoginData="updateLoginData"
                :noAddress="true"
              />
              <v-col cols="auto">
                <v-checkbox
                  v-model="isWithdrawAll"
                  :label="$t('withdrawAll')"
                ></v-checkbox>
              </v-col>
            </v-row>
            <small>{{ $t('hint.withdrawTime') }}</small>
          </v-container>
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
            @click="withdrawStake"
            :loading="isWithdrawLoading"
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
  import { formatValue } from '@/core/utils.js';
  export default {
    name: 'WithdrawModalDesktop',
    data() {
      return {
        amount: null,
      };
    },
    watch: {
      amount(n) {
        if (this.amount >= this.stakedValue) {
          this.isWithdrawAll = true;
        } else {
          this.isWithdrawAll = false;
        }
        this.updateAmount(n);
      },
      isWithdrawAll(n) {
        if (n) {
          this.amount = this.stakedValue;
        }
      },
    },
    components: {
      LoginFields,
    },
    props: {
      isOpened: Boolean,
      isValid: Boolean,
      isAll: Boolean,
      stakedValue: Number,
      // amount: Number,
      isWithdrawLoading: Boolean,
    },
    computed: {
      isModalOpened: {
        set(v) {
          this.$emit('set-is-modal-opened', v);
        },
        get() {
          return this.isOpened;
        },
      },
      valid: {
        set(v) {
          this.$emit('set-is-valid', v);
        },
        get() {
          return this.isValid;
        },
      },
      isWithdrawAll: {
        set(v) {
          this.$emit('set-is-withdraw-all', v);
        },
        get() {
          return this.isAll;
        },
      },
    },
    methods: {
      withdrawStake() {
        this.$emit('withdraw-stake');
      },
      updateLoginData(data) {
        this.$emit('update-login-data', data);
      },
      updateAmount(amount) {
        this.$emit('set-withdraw-amount', parseFloat(amount));
      },
      formatValue,
    },
  };
</script>
