<template>
  <v-data-table
    @update:page="pageNum += 1"
    :mobile-breakpoint="880"
    :headers="headersDesktop"
    :items="dePoolList"
    :search="search"
    :loading="isDePoolsLoading"
    multi-sort
    :items-per-page="50"
    :options="{
      sortBy: ['participantsAmount'],
      sortDesc: [true],
    }"
    :footer-props="{
      itemsPerPageOptions: [50, 100, 5, -1],
    }"
  >
    <!-- HEADER -->
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.stakeComplitionChart="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.activity') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.address="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.address') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.validatorAddress="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.validatorAddress') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.minStake="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.minStake') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.assurance="{ header }">
      <v-tooltip
        transition="scroly-reverse-transition"
        max-width="400px"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.assurance') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.assets="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.assets') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.participantsAmount="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.participants') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.rewardFraction="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.fee') }}</span>
      </v-tooltip>
    </template>
    <!-- BODY -->
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.stakeComplitionChart="{ item }">
      <stake-complition-chart :rounds="item.rounds" :id="pageNum" />
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.fullAddress="{ item }">
      <div class="table-row-flex">
        <CopyToClipboard :text="item.fullAddress">
          <v-tooltip transition="scroly-reverse-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
                elevation="0"
                style="min-width: 30px"
                @click="openSnackbar"
              >
                <v-icon v-text="'mdi-content-copy'" small></v-icon>
              </v-btn>
            </template>
            <span>{{ $t('hint.copyAddress') }}</span>
          </v-tooltip>
        </CopyToClipboard>
        <div
          v-if="item.customData.length > 0"
          class="d-flex justify-center align-center"
        >
          <img
            v-if="item.customAvatarSrc !== undefined"
            :src="item.customAvatarSrc"
            style="width: 30px; height: 100%; border-radius: 6px; padding: 3px"
            class="mr-1"
            width="30px"
            onerror="this.style.display='none'"
          />
          <v-tooltip transition="scroll-y-reverse-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <a
                :href="`${explorerAddressUrl}${item.fullAddress}`"
                target="_blank"
                rel="noopener noreferrer"
                v-bind="attrs"
                v-on="on"
                class="table-value"
              >
                {{ item.customName }}
              </a>
            </template>
            <span>{{ $t('hint.openInExplorer') }}</span>
          </v-tooltip>
        </div>

        <template v-else>
          <v-tooltip transition="scroll-y-reverse-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <a
                :href="`${explorerAddressUrl}${item.fullAddress}`"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 mb-2 table-desktop-address"
                v-bind="attrs"
                v-on="on"
              >
                {{ item.address }}
                <v-icon
                  v-text="'mdi-arrow-top-right'"
                  color="primary"
                  small
                ></v-icon>
              </a>
            </template>
            <span>{{ $t('hint.openInExplorer') }}</span>
          </v-tooltip>
        </template>
      </div>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.fullValidatorAddress="{ item }">
      <div class="table-row-flex">
        <CopyToClipboard :text="item.fullValidatorAddress">
          <v-tooltip transition="scroly-reverse-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
                elevation="0"
                style="min-width: 30px"
                @click="openSnackbar"
              >
                <v-icon v-text="'mdi-content-copy'" small></v-icon>
              </v-btn>
            </template>
            <span>{{ $t('hint.copyAddress') }}</span>
          </v-tooltip>
        </CopyToClipboard>
        <v-tooltip transition="scroll-y-reverse-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <a
              :href="`${explorerAddressUrl}${item.fullValidatorAddress}`"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-1 mb-2 table-desktop-address"
              v-bind="attrs"
              v-on="on"
            >
              {{ item.validatorAddress }}
              <v-icon
                v-text="'mdi-arrow-top-right'"
                color="primary"
                small
              ></v-icon>
            </a>
          </template>
          <span>{{ $t('hint.openInExplorer') }}</span>
        </v-tooltip>
      </div>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.participantsAmount="{ item }">
      <span class="d-flex align-center">
        {{ item.participantsAmount }}
        <v-icon
          v-text="'mdi-account'"
          class="ml-1"
          style="font-size: 0.9rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.minStake="{ item }">
      <span class="d-flex align-center justify-start">
        <span class="table-value">
          {{ formatValue(item.minStake) }}
        </span>
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.7rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.assurance="{ item }">
      <span class="d-flex align-center table-value">
        {{ formatValue(item.assurance) }}
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.7rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.rewardFraction="{ item }">
      {{ item.rewardFraction.toString() + ' %' }}
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.assets="{ item }">
      <span class="d-flex align-center table-value">
        {{ formatValue(Math.floor(item.assets)) }}
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.7rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.dePoolClosed="{ item }">
      <v-btn
        width="100%"
        small
        color="primary"
        elevation="0"
        @click="openModal(true, item.fullAddress, item.minStake)"
        v-if="!item.dePoolClosed"
      >
        Stake
      </v-btn>
      <v-tooltip v-else transition="scroll-y-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <h4
            v-bind="attrs"
            v-on="on"
            style="text-transform: uppercase; width: 100%; text-align: center"
          >
            {{ $t('poolClosed') }}
          </h4>
        </template>
        <span>{{ $t('toolTip.poolClosed') }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
  import { formatValue } from '@/core/utils.js';
  import CopyToClipboard from 'vue-copy-to-clipboard';

  import StakeComplitionChart from '../components/StakeComplitionChart/StakeComplitionChart.vue';

  export default {
    name: 'TableDesktop',
    data() {
      return {
        pageNum: 1,
        explorerAddressUrl: process.env.VUE_APP_EXPLORER_ADDRESS,
      };
    },
    props: {
      dePoolList: Array,
      isDePoolsLoading: Boolean,
      search: String,
    },
    components: {
      CopyToClipboard,
      StakeComplitionChart,
    },
    computed: {
      headersDesktop() {
        return [
          {
            text: this.$t('activity'),
            value: 'stakeComplitionChart',
          },
          {
            text: this.$t('address'),
            value: 'fullAddress',
          },
          {
            text: this.$t('validatorAddress'),
            value: 'fullValidatorAddress',
          },
          { text: this.$t('minStake'), align: 'start', value: 'minStake' },
          { text: this.$t('assurance'), align: 'start', value: 'assurance' },
          { text: this.$t('assets'), align: 'start', value: 'assets' },
          { text: this.$t('participants'), value: 'participantsAmount' },
          { text: this.$t('validatorFraction'), value: 'rewardFraction' },
          {
            text: '',
            value: 'dePoolClosed',
            sortable: false,
          },
        ];
      },
    },
    methods: {
      openSnackbar() {
        this.$emit('open-snackbar');
      },
      openModal(val, address, minStake) {
        this.$emit('open-modal', val, address, minStake);
      },
      formatValue,
    },
  };
</script>

<style lang="scss" scoped>
  .table {
    &-desktop-address {
      overflow: hidden;
      white-space: nowrap;
    }
    &-value {
      white-space: nowrap;
    }
  }
</style>
