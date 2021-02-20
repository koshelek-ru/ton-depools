<template>
  <v-dialog
    v-model="isModalOpened"
    fullscreen
    persistent
    transition="scroll-y-reverse-transition"
  >
    <v-form v-model="valid" style="height: 100%">
      <v-card style="min-height: 100%">
        <v-card-title>
          <span class="headline mt-4">{{ $t('withdrawStake') }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span style="font-size: 1rem" class="d-flex align-center">
                <span class="text--primary mr-1"> {{ $t('available') }}: </span>
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
                prepend-inner-icon="mdi-diamond-outline"
                suffix="TON"
                type="number"
                :rules="[(v) => !!v || $t('rules.requiredField')]"
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
    name: 'WithdrawModalMobile',
    components: {
      LoginFields,
    },
    props: {
      isOpened: Boolean,
      isValid: Boolean,
      isAll: Boolean,
      stakedValue: Number,
      isWithdrawLoading: Boolean,
    },
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
