<template>
  <v-data-table
    @update:page="pageNum += 1"
    :headers="headersMobile"
    :items="dePoolList"
    :loading="isDePoolsLoading"
    :search="search"
    :mobile-breakpoint="880"
    :fixed-header="true"
    :options="{
      itemsPerPage: 20,
      sortBy: ['participantsAmount'],
      sortDesc: [true],
    }"
    :footer-props="{
      itemsPerPageOptions: [20, 100, 5, -1],
      showCurrentPage: false,
      showFirstLastPage: false,
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
    <template v-slot:header.addressMobile="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.address') }}</span>
      </v-tooltip>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:header.validatorAddressMobile="{ header }">
      <v-tooltip transition="scroly-reverse-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ header.text }}</span>
        </template>
        <span>{{ $t('toolTip.address') }}</span>
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
      <div class="d-flex justify-center align-center">
        <CopyToClipboard :text="item.fullAddress">
          <v-btn
            style="min-width: 20px; padding: 10px"
            small
            class="mr-1"
            elevation="0"
            @click="openSnackbar"
          >
            <v-icon v-text="'mdi-content-copy'" small></v-icon>
          </v-btn>
        </CopyToClipboard>
        <span class="d-flex align-center" v-if="item.customName !== ''">
          <img
            v-if="item.customAvatarSrc !== undefined"
            :src="item.customAvatarSrc"
            width="30px"
            style="width: 30px; height: 100%; border-radius: 4px; padding: 2px"
            class="mr-2"
            onerror="this.style.display='none'"
          />
          <a
            :href="`${explorerAddressUrl}${item.fullAddress}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.customName }}
            <v-icon
              v-text="'mdi-arrow-top-right'"
              color="primary"
              small
            ></v-icon>
          </a>
        </span>
        <span v-else class="d-flex align-center">
          <a
            :href="`${explorerAddressUrl}${item.fullAddress}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.addressMobile }}
            <v-icon
              v-text="'mdi-arrow-top-right'"
              color="primary"
              small
            ></v-icon>
          </a>
        </span>
      </div>
    </template>

    <!-- eslint-disable-next-line  -->
    <template v-slot:item.fullValidatorAddress="{ item }">
      <span>
        <CopyToClipboard :text="item.fullValidatorAddress">
          <v-btn
            style="min-width: 20px; padding: 10px"
            small
            class="mr-1"
            elevation="0"
            @click="openSnackbar"
          >
            <v-icon v-text="'mdi-content-copy'" small></v-icon>
          </v-btn>
        </CopyToClipboard>
        <a
          :href="`${explorerAddressUrl}${item.fullValidatorAddress}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.validatorAddressMobile }}
          <v-icon v-text="'mdi-arrow-top-right'" color="primary" small></v-icon>
        </a>
      </span>
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
      <span class="d-flex align-center">
        <span>
          {{ formatValue(item.minStake) }}
        </span>
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.9rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.assurance="{ item }">
      <span class="d-flex align-center">
        {{ formatValue(item.assurance) }}
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.9rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.rewardFraction="{ item }">
      {{ item.rewardFraction.toString() + ' %' }}
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.assets="{ item }">
      <span class="d-flex align-center">
        {{ formatValue(Math.floor(item.assets)) }}
        <v-icon
          v-text="'mdi-diamond'"
          color="diamond"
          class="ml-1"
          style="font-size: 0.9rem"
        ></v-icon>
      </span>
    </template>
    <!-- eslint-disable-next-line  -->
    <template v-slot:item.dePoolClosed="{ item }">
      <v-btn
        small
        elevation="0"
        color="primary"
        block
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
    name: 'TableMobile',
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
      headersMobile() {
        return [
          {
            text: this.$t('activity'),
            value: 'stakeComplitionChart',
          },
          {
            text: this.$t('address'),
            align: 'start',
            value: 'fullAddress',
          },
          {
            text: this.$t('validatorAddress'),
            value: 'fullValidatorAddress',
          },
          { text: this.$t('minStake'), value: 'minStake' },
          { text: this.$t('assurance'), value: 'assurance' },
          { text: this.$t('participants'), value: 'participantsAmount' },
          { text: this.$t('validatorFraction'), value: 'rewardFraction' },
          { text: this.$t('assets'), value: 'assets' },
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
