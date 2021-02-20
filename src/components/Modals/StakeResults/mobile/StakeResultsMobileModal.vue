<template>
  <v-dialog
    v-model="isModalOpened"
    color="primary"
    transition="scroll-y-reverse-transition"
    fullscreen
    persistent
  >
    <v-form>
      <v-card style="min-height: 100vh">
        <v-card-title>
          <span class="headline mt-4">{{ $t('stakeResults') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="mb-4">
              <v-col cols="12">
                <span style="font-size: 1rem">{{ $t('balanceChange') }}</span>
                <span
                  style="font-size: 1.5rem"
                  class="d-flex align-center mt-2"
                >
                  -{{
                    parseFloat(results.stakeOutput) +
                    parseFloat(results.stakeAccountFees)
                  }}
                  <v-icon
                    size="1.1rem"
                    color="diamond"
                    v-text="'mdi-diamond'"
                    class="ml-1"
                  ></v-icon>
                </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('from') }}</span>
                <span class="d-flex align-center">
                  <CopyToClipboard :text="results.clientAddress.full">
                    <v-btn
                      small
                      class="mr-2"
                      elevation="0"
                      @click="openSnackbar"
                    >
                      <v-icon v-text="'mdi-content-copy'" small></v-icon>
                    </v-btn>
                  </CopyToClipboard>
                  <a
                    :href="`${explorerAddressUrl}${results.clientAddress.full}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ results.clientAddress.short }}
                    <v-icon
                      v-text="'mdi-arrow-top-right'"
                      color="primary"
                      small
                    ></v-icon>
                  </a>
                </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('to') }}</span>
                <span class="d-flex align-center">
                  <CopyToClipboard :text="results.dePoolAddress.full">
                    <v-btn
                      small
                      class="mr-2"
                      elevation="0"
                      @click="openSnackbar"
                    >
                      <v-icon v-text="'mdi-content-copy'" small></v-icon>
                    </v-btn>
                  </CopyToClipboard>
                  <a
                    :href="`${explorerAddressUrl}${results.dePoolAddress.full}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ results.dePoolAddress.short }}
                    <v-icon
                      v-text="'mdi-arrow-top-right'"
                      color="primary"
                      small
                    ></v-icon>
                  </a>
                </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('amount') }}</span>
                <span style="font-size: 1rem"> {{ results.stakeOutput }} </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('fee') }}</span>
                <span style="font-size: 1rem">
                  {{ results.stakeAccountFees }}
                </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('result') }}</span>
                <span style="font-size: 1rem; color: #5cb85c">
                  {{ results.isStakeSuccessful }}
                </span>
              </v-col>
            </v-row>
            <v-row class="stake-results__row">
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('txId') }}</span>
                <span class="d-flex align-center">
                  <CopyToClipboard :text="results.stakeTxId.full">
                    <v-btn
                      small
                      class="mr-2"
                      elevation="0"
                      @click="openSnackbar"
                    >
                      <v-icon v-text="'mdi-content-copy'" small></v-icon>
                    </v-btn>
                  </CopyToClipboard>
                  <a
                    :href="`${explorerTxUrl}${results.stakeTxId.full}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ results.stakeTxId.short }}
                    <v-icon
                      v-text="'mdi-arrow-top-right'"
                      color="primary"
                      small
                    ></v-icon>
                  </a>
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="centered-between">
                <span style="font-size: 1rem">{{ $t('dateAndTime') }}</span>
                <span style="font-size: 1rem"> {{ results.stakeDate }} </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">
            {{ $t('btn.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
  import CopyToClipboard from 'vue-copy-to-clipboard';
  export default {
    name: 'StakeResultsMobileModal',
    components: {
      CopyToClipboard,
    },
    data() {
      return {
        explorerAddressUrl: process.env.VUE_APP_EXPLORER_ADDRESS,
        explorerTxUrl: process.env.VUE_APP_EXPLORER_TX,
      };
    },
    props: {
      isOpened: Boolean,
      stakeResultsData: Object,
    },
    computed: {
      results() {
        return { ...this.stakeResultsData };
      },
      isModalOpened: {
        set(v) {
          this.$emit('set-is-modal-opened', v);
        },
        get() {
          return this.isOpened;
        },
      },
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      openSnackbar() {
        this.$emit('open-snackbar');
      },
    },
  };
</script>
