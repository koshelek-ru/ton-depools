<template>
  <section class="myStakes">
    <template v-if="isLoggedIn">
      <template v-if="isStakesLoaded">
        <div class="myStakes-header">
          <h1 class="myStakes-header__text">{{ $t('links.myStakes') }}</h1>
          <div class="myStakes-client-header">
            <div class="myStakes-client-header__item">
              <span class="myStakes-client-header__item-title">
                {{ $t('address') }}:
              </span>
              <div class="myStakes-client-header__address">
                <a
                  :href="`${explorerAddressUrl}${clientAddress}`"
                  target="_blank"
                  class="link"
                >
                  {{ formatAddress(clientAddress, 8, 62).short }}
                  <v-icon
                    v-text="'mdi-arrow-top-right'"
                    color="primary"
                    small
                  ></v-icon>
                </a>
              </div>
            </div>
            <div class="myStakes-client-header__item">
              <span class="myStakes-client-header__item-title"
                >{{ $t('balance') }}:</span
              >
              <span class="myStakes-client-header__balance">
                {{ clientBalance }}
                <v-icon
                  class="ml-1 myStakes-client-header__balance"
                  v-text="'mdi-diamond'"
                  color="diamond"
                ></v-icon>
              </span>
            </div>
            <div class="myStakes-client-header__item">
              <v-tooltip transition="scroll-y-reverse-transition" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="signOut"
                    elevation="0"
                  >
                    <v-icon small v-text="'mdi-logout'"></v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('signOut') }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
        <annual-yield-chart />
        <template v-if="clientStakes.length > 0">
          <v-row class="stake-card-wrapper">
            <v-col
              class="stake-card"
              :cols="clientStakes.length > 3 && 3"
              v-for="(item, i) in clientStakes"
              :key="i"
            >
              <v-card color="light_grey" class="mx-auto" rounded shaped raised>
                <v-card-title style="display: block">
                  <div class="d-flex align-center mb-3">
                    <template
                      v-if="
                        customDepoolData.length > 0 &&
                        typeof customDepoolData[i] !== 'undefined'
                      "
                    >
                      <div class="myStakes-dePool__avatar-wrapper">
                        <img
                          v-if="
                            customDepoolData[i].customData[0].avatarSrc !==
                            undefined
                          "
                          :src="customDepoolData[i].customAvatarSrc"
                          class="myStakes-dePool__avatar"
                          onerror="this.style.display='none'"
                        />
                      </div>
                      <div class="align-center" style="align-self: center">
                        <div
                          class="title title--dePoolName"
                          style="line-height: 1.4"
                        >
                          <div>
                            <a
                              :href="explorerAddressUrl + item.dePool"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {{ customDepoolData[i].customName }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <span
                        class="title"
                        style="font-size: 1rem !important; line-height: 1.4"
                      >
                        <a
                          :href="explorerAddressUrl + item.dePool"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {{ item.dePool }}
                        </a>
                      </span>
                    </template>
                    <CopyToClipboard
                      style="display: block; height: 100%; width: 100%"
                      :text="item.dePool"
                    >
                      <v-tooltip transition="scroly-reverse-transition" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            x-small
                            elevation="0"
                            class="ml-2"
                            style="min-width: 30px; height: 30px; width: 100%"
                            color="grey"
                            @click="openSnackbar"
                          >
                            <v-icon v-text="'mdi-content-copy'" small></v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('hint.copyAddress') }}</span>
                      </v-tooltip>
                    </CopyToClipboard>
                  </div>
                  <div>
                    <span
                      style="font-size: 1rem !important; align-self: flex-end"
                      class="font-weight-light d-flex align-center"
                    >
                      {{ $t('reinvest') }}:
                      <template>
                        <v-icon
                          v-text="
                            item.reinvest ? 'mdi-moon-full' : 'mdi-moon-new'
                          "
                          :color="item.reinvest ? 'success' : 'error'"
                          class="ml-1"
                          small
                        ></v-icon>
                      </template>
                    </span>
                  </div>
                </v-card-title>
                <v-card-text style="font-size: 1.1rem">
                  <v-row class="d-flex flex-wrap">
                    <v-col cols="auto" class="mr-6">
                      <v-sheet color="transparent">
                        {{ $t('sum') }}
                        <span
                          class="mt-2 d-flex align-center text--secondary stake-card__info"
                        >
                          {{ formatValue(convertNanoToTon(item.total)) }}
                          <v-icon
                            v-text="'mdi-diamond'"
                            class="ml-1 stake-card__info"
                            color="diamond"
                          >
                          </v-icon>
                        </span>
                      </v-sheet>
                    </v-col>
                    <v-col cols="auto" class="mr-6">
                      <v-sheet color="transparent">
                        {{ $t('reward') }}
                        <span
                          class="mt-2 d-flex align-center text--secondary stake-card__info"
                        >
                          {{ formatValue(convertNanoToTon(item.reward)) }}
                          <v-icon
                            v-text="'mdi-diamond'"
                            class="ml-1 stake-card__info"
                            color="diamond"
                          >
                          </v-icon>
                        </span>
                      </v-sheet>
                    </v-col>
                    <v-col v-if="parseInt(item.withdrawValue, 16) > 0">
                      <v-sheet class="light_grey" width="100%">
                        {{ $t('withdrawn') }}:
                        <span
                          class="mt-2 d-flex align-center text--secondary stake-card__info"
                        >
                          {{
                            formatValue(convertNanoToTon(item.withdrawValue))
                          }}
                          <v-icon
                            v-text="'mdi-diamond'"
                            class="ml-1 stake-card__info"
                            color="diamond"
                          >
                          </v-icon>
                        </span>
                      </v-sheet>
                    </v-col>
                  </v-row>

                  <v-row class="d-flex justify-space-between flex-wrap">
                    <v-col v-if="Object.keys(item.stakes).length > 0">
                      <h4 class="mt-2">
                        {{ $t('stakes') }} ({{
                          Object.keys(item.stakes).length
                        }})
                      </h4>
                      <v-list color="light_grey">
                        <v-list-item
                          v-for="(stake, i) in item.stakes"
                          :key="i"
                          class="stakes-item accent elevation-1 rounded"
                          @click="
                            setWithdrawModal(item, convertNanoToTon(stake))
                          "
                        >
                          <v-list-item-content class="stakes-item__content">
                            <v-list-item-title>
                              {{ formatValue(convertNanoToTon(stake)) }}
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action> </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col v-if="Object.keys(item.locks).length > 0">
                      <h4 class="mt-2">
                        {{ $t('lockStakes') }} ({{
                          Object.keys(item.locks).length
                        }})
                      </h4>
                      <v-list color="light_grey">
                        <v-list-item
                          v-for="(value, i) in item.locks"
                          :key="i"
                          class="stakes-item accent elevation-1 rounded"
                          @click="
                            setWithdrawModal(
                              item,
                              convertNanoToTon(value.remainingAmount)
                            )
                          "
                        >
                          <v-list-item-content class="stakes-item__content">
                            <v-list-item-title class="mb-2">
                              <span> {{ $t('owner') }}: </span>
                              <CopyToClipboard :text="value.owner">
                                <a class="copy-id" @click="openSnackbar">
                                  <v-icon
                                    v-text="'mdi-content-copy'"
                                    small
                                  ></v-icon>
                                  {{ formatAddress(value.owner).short }}
                                </a>
                              </CopyToClipboard>
                            </v-list-item-title>
                            <v-list-item-title class="mb-2">
                              <span class="flex-aligned">
                                {{ $t('remainder') }}:
                                {{
                                  formatValue(
                                    convertNanoToTon(value.remainingAmount)
                                  )
                                }}
                              </span>
                            </v-list-item-title>
                            <v-list-item-title class="mb-2">
                              <span class="flex-aligned">
                                {{ $t('withdraw') }}:
                                {{
                                  formatValue(
                                    convertNanoToTon(value.withdrawalValue)
                                  )
                                }}
                              </span>
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action> </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col v-if="Object.keys(item.vestings).length > 0">
                      <h4 class="mt-2">
                        {{ $t('vestingStakes') }} ({{
                          Object.keys(item.vestings).length
                        }})
                      </h4>
                      <v-list class="light-grey">
                        <v-list-item-group>
                          <v-list-item
                            v-for="(stake, i) in item.vestings"
                            :key="i"
                            class="stakes-item accent elevation-1 rounded"
                          >
                            <v-list-item-content class="stakes-item__content">
                              <v-list-item-title class="mb-2">
                                <span> {{ $t('owner') }}: </span>
                                <CopyToClipboard :text="stake.owner">
                                  <a class="copy-id" @click="openSnackbar">
                                    <v-icon
                                      v-text="'mdi-content-copy'"
                                      small
                                    ></v-icon>
                                    {{ formatAddress(stake.owner).short }}
                                  </a>
                                </CopyToClipboard>
                              </v-list-item-title>
                              <v-list-item-title class="mb-2">
                                <span class="flex-aligned">
                                  {{ $t('remainder') }}:
                                  {{
                                    formatValue(
                                      convertNanoToTon(stake.remainingAmount)
                                    )
                                  }}
                                </span>
                              </v-list-item-title>
                              <v-list-item-title class="mb-2">
                                <span class="flex-aligned">
                                  {{ $t('withdraw') }}:
                                  {{
                                    formatValue(
                                      convertNanoToTon(stake.withdrawalValue)
                                    )
                                  }}
                                </span>
                              </v-list-item-title>
                              <v-list-item-title class="mb-2">
                                <span class="flex-aligned">
                                  {{ $t('lastWithdrawTime') }}:
                                  {{
                                    getDateString(
                                      parseInt(stake.lastWithdrawalTime, 16)
                                    )
                                  }}
                                </span>
                              </v-list-item-title>
                              <v-list-item-title class="mb-2">
                                <span class="flex-aligned">
                                  {{ $t('withdrawPeriod') }}:
                                  {{
                                    getDateString(
                                      Math.floor(Date.now() / 1000) +
                                        parseInt(stake.withdrawalPeriod, 16)
                                    )
                                  }}
                                </span>
                              </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action> </v-list-item-action>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-row align="center" justify="end">
                      <v-btn
                        v-if="item.lastMessageFunction !== 'withdrawAll'"
                        color="primary"
                        @click="setWithdrawModal(item)"
                      >
                        {{ $t('btn.withdraw') }}
                      </v-btn>
                      <v-btn v-else color="primary" disabled>
                        {{ $t('stakeIsWithdrawing') }}
                      </v-btn>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
            <WithdrawModal
              :isOpened="withdrawOpened"
              @set-modal="setWithdrawModal"
              :value="withdrawValue"
              :stakedValue="stakedValue"
              :dePool="dePoolAddress"
            />
          </v-row>
        </template>
        <div v-else class="no-stakes">
          <div>
            <v-icon
              v-text="'mdi-magnify'"
              style="font-size: 6rem"
              class="mb-1"
            ></v-icon>
          </div>
          <span style="font-size: 1.1rem; font-weight: 300">
            {{ $t('stakesNotFound') }}
          </span>
        </div>
      </template>
      <div
        class="text-center mx-auto"
        style="width: 100%; margin-top: 15vh"
        v-else
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
    <Login v-else />
  </section>
</template>

<script>
  import CopyToClipboard from 'vue-copy-to-clipboard';
  import {
    convertNanoToTon,
    formatAddress,
    formatDate,
    formatValue,
  } from '@/core/utils.js';
  import { mapActions, mapMutations, mapState } from 'vuex';

  import WithdrawModal from '@/components/Modals/WithdrawStake/WithdrawModal.vue';
  import Login from '@/views/Login/Login.vue';
  import AnnualYieldChart from './components/AnnualYieldChart/AnnualYieldChart.vue';

  export default {
    name: 'MyStakes',
    data() {
      return {
        withdrawValue: 0,
        dePoolAddress: '',
        stakedValue: null,
        withdrawOpened: false,
        explorerAddressUrl: process.env.VUE_APP_EXPLORER_ADDRESS,
      };
    },
    components: {
      WithdrawModal,
      Login,
      CopyToClipboard,
      AnnualYieldChart,
    },
    computed: {
      clientBalance() {
        return formatValue(convertNanoToTon(this.$store.state.clientBalance));
      },
      customDepoolData() {
        if (this.dePoolList.length > 0 && this.isStakesLoaded) {
          const customData = [];
          this.clientStakes.forEach((stake) => {
            this.dePoolList.forEach((data) => {
              if (
                data.fullAddress === stake.dePool &&
                data.customData.length > 0
              ) {
                customData.push(data);
                return;
              }
            });
          });
          return customData;
        } else {
          return [];
        }
      },
      ...mapState([
        'isClientLoaded',
        'clientStakes',
        'isLoggedIn',
        'isStakesLoaded',
        'clientAddress',
        'dePoolList',
        'isMobile',
      ]),
    },
    watch: {
      isClientLoaded(n) {
        if (n && this.$route.params.clientAddress !== undefined) {
          this.getClientStakes();
        }
      },
      $route(to, from) {
        if (to.params.clientAddress !== undefined) {
          if (from.name !== 'MyStakes') {
            this.resetClientLoginCredentials();
          }
          this.setClientAddress(to.params.clientAddress);
          this.setIsStakesLoaded(false);
          this.getClientStakes();
          this.setIsLoggedIn(true);
        } else {
          this.resetClientLoginCredentials();
          this.setIsLoggedIn(false);
          this.setIsStakesLoaded(false);
        }
      },
      clientAddress(n) {
        if (n !== null && n !== '' && n !== this.$route.params.clientAddress) {
          this.$router.push({
            name: 'MyStakesLoggedIn',
            params: { clientAddress: n },
          });
        }
      },
    },
    methods: {
      withdrawStake() {
        if (this.selectedStakes.length !== 0) {
          const sum = this.selectedStakes.reduce(
            (acc, curr) => parseFloat(acc) + parseFloat(curr)
          );
          return sum;
        }
      },
      setWithdrawModal(item, stakeValue) {
        if (this.withdrawOpened === false) {
          this.stakedValue = parseFloat(convertNanoToTon(item.total));
          this.dePoolAddress = item.dePool;
          this.withdrawValue = parseFloat(stakeValue);
        }
        this.withdrawOpened = !this.withdrawOpened;
      },
      openSnackbar() {
        this.setShowSnackbar(true);
      },
      signOut() {
        this.$router.push('/mystakes');
      },
      getDateString(time) {
        return `${formatDate(time).dateString} ${formatDate(time).timeString}`;
      },
      ...mapActions(['getClientStakes']),
      ...mapMutations([
        'resetClientLoginCredentials',
        'setIsLoggedIn',
        'setIsStakesLoaded',
        'setShowSnackbar',
        'setClientAddress',
      ]),
      convertNanoToTon,
      formatAddress,
      formatValue,
      formatDate,
    },
    beforeCreate() {
      if (this.$route.params.clientAddress !== undefined) {
        this.$store.commit(
          'setClientAddress',
          this.$route.params.clientAddress
        );
        this.$store.commit('setIsLoggedIn', true);
      }
    },
    created() {
      if (
        this.isClientLoaded &&
        this.$route.params.clientAddress !== undefined
      ) {
        this.getClientStakes();
      }
    },
  };
</script>

<style lang="scss" scoped>
  .stakes-item {
    margin-bottom: 0.5em;

    &:last-child {
      margin: 0;
    }
  }
  .title--dePoolName {
    font-size: 1.4rem !important;
    display: flex;
    align-items: center;
  }
  .myStakes-dePool__avatar-wrapper {
    height: 40px;
  }
  .myStakes-dePool__avatar {
    width: 40px;
    margin: 3px;
    // border: 2px solid #329ef4;
    border-radius: 6px;
    align-self: center;
  }
  .flex-aligned {
    display: flex;
    align-items: center;
  }
  .stake-card {
    min-width: 33.33%;
    &__info {
      font-size: 1.5rem;
      white-space: nowrap;
    }
  }
  .no-stakes {
    margin-top: 5vh;
    margin-bottom: 5vh;
    text-align: center;
  }
  .myStakes {
    &-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1em;
      &__text {
        font-weight: 300 !important;
        font-size: 2rem;
      }
    }

    &-client-header {
      display: flex;
      align-items: center;

      &__address {
        word-wrap: break-word;
        font-size: 1.1rem;
      }
      &__balance {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
      }
      &__item {
        margin-left: 1em;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        &-title {
          font-weight: 300;
          margin-right: 0.5em;
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    .stake-card {
      min-width: 100%;
      &-wrapper {
        display: flex;
        justify-content: center;
      }
      &__info {
        font-size: 1.3rem;
      }
    }
    .myStakes {
      &-header {
        display: block;
        padding-bottom: 0px;
        &__text {
          font-size: 1.8rem;
        }
      }
      &-client-header {
        display: block;
        margin-top: 1em;
        &-title {
          margin-right: 0px;
        }
        &__item {
          margin-left: 0px !important;
          margin-right: 0.5em;
          margin-bottom: 0.5em;
          &-title {
            font-size: 1.1rem !important;
          }
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    .stake-card {
      &__info {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 640px) {
    .stake-card {
      min-width: 100% !important;
    }
    .title--dePoolName {
      font-size: 1.2rem !important;
    }
  }

  @media screen and (max-width: 790px) {
    .stake-card {
      min-width: 50%;
    }
  }
</style>
