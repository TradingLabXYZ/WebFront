<template>
  <div
    v-if="!isMobile"
    class="p-5 mb-5 rounded-3xl bg-verysoftcyan dark:bg-deeppurple">
    <div class="p-1 text-2xl font-bold text-center text-deepgray dark:text-gray-200">
      Add a new trade
    </div>
      <div class="m-1 mb-3 grid grid-cols-4">
        <div class="p-2 mx-4 rounded-xl col-span-2">
          <label class="text-xs text-subtradelabel dark:text-gray-200">
            Exchange
          </label>
          <input
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="exchange">
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel dark:text-gray-200">
            Selling
          </label>
          <input
            type="text"
            class="w-full p-2 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            @focus="onFocusFirstPair()"
            v-model="userInputFirstPair"
            @keydown="monitorKeysFirstPair"
            tabindex="0">
          <div
            v-if="focusedFirstPair"
            class="absolute z-50 bg-gray-200 dark:bg-gray-600">
            <div
              v-for="(key, value) in dynamicUserFirstInput"
              v-bind:key="value"
              v-on:click="fillBarFirstInput(key)"
              class="px-2 hover:bg-gray-600 hover:text-gray-50 rounded-md"
              :class="{ ['bg-azure']: value === selectedFirstPair }">
              {{ key[0] }} - {{ key[1] }}
            </div>
          </div>
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel dark:text-gray-200">
            Buying
          </label>
          <input
            type="text"
            class="w-full p-2 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            @focus="onFocusSecondPair()"
            v-model="userInputSecondPair"
            @keydown="monitorKeysSecondPair"
            tabindex="0">
          <div
            v-if="focusedSecondPair"
            class="absolute z-50 bg-gray-200 dark:bg-gray-600">
            <div
              v-for="(key, value) in dynamicUserSecondInput"
              v-bind:key="value"
              v-on:click="fillBarSecondInput(key)"
              class="px-2 hover:bg-gray-600 hover:text-gray-50 rounded-md"
              :class="{ ['bg-azure']: value === selectedSecondPair }">
              {{ key[0] }} - {{ key[1] }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(subtrade, i) in subtrades"
        :key="subtrade.Timestamp"
        class="mb-8 ml-8 rounded-xl grid grid-cols-12">
        <div class="bg-verysoftcyan rounded-3xl col-span-11 dark:bg-sandpurple">
          <div class="pt-4 pl-4 pr-4 mt-3 grid grid-cols-6">
            <div class="ml-4 mr-4 rounded-xl col-span-2">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Date/Time
              </label>
              <input
                name="date"
                type="text"
                onfocus="(this.type='datetime-local')"
                onfocusout="(this.type='text')"
                class="w-full p-2 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.CreatedAt">
            </div>
            <div class="ml-4 mr-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Buy/Sell
              </label>
              <select
                class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.Type">
                <option value="BUY">
                  BUY
                </option>
                <option value="SELL">
                  SELL
                </option>
              </select>
            </div>
            <div class="ml-4 mr-4 rounded-xl col-span-3">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Trade reason / Description
              </label>
              <input
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.Reason">
            </div>
          </div>
          <div class="p-4 grid grid-cols-3">
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Quantity
              </label>
              <input
                min="0.00000000001"
                type="number"
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.Quantity">
            </div>
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Average price
              </label>
              <input
                min="0.00000000001"
                type="number"
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.AvgPrice">
            </div>
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel dark:text-gray-200">
                Total
              </label>
              <input
                min="0.00000000001"
                type="number"
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
                v-model="subtrade.Total">
            </div>
          </div>
        </div>
        <div class="flex justify-around ml-2 col-span-1">
          <div class="flex align-middle">
            <button
              @click="addSubtrade()"
              title="Add Subtrade"
              class="p-1">
              <AddSubtradeOpen class="text-green-400 fill-current dark:text-green-800"/>
            </button>
            <button
              v-if="subtrades.length > 1"
              @click="removeSubtrade(i)"
              title="Remove Subtrade"
              class="">
              <RemoveSubtradeOpen class="text-red-400 fill-current dark:text-red-800"/>
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="confirmInsertTrade()"
          class="p-2 mr-2 text-lg text-white rounded-lg bg-blueshine dark:bg-verysoftcyan dark:text-gray-800">
          CONFIRM
        </button>
        <button
          @click="cancelInsertTrade()"
          class="p-2 ml-2 text-lg rounded-lg bg-verysoftcyan dark:bg-blueshine dark:text-gray-200">
          CANCEL
        </button>
      </div>
    </div>
  </div>
  <div v-else class="px-3 py-1 my-1 rounded dark:bg-deeppurple">
    <div class="p-1 text-xs font-bold text-center text-deepgray dark:text-gray-200">
      Add a new trade
    </div>
    <div class="mb-2">
      <div class="flex flex-col space-y-1">
        <div class="flex flex-col justify-center text-center rounded-xl">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Exchange
          </label>
          <input
            class="h-5 text-xs text-gray-800 border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            v-model="exchange">
        </div>
        <div class="flex flex-col items-center justify-center rounded-xl">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Selling
          </label>
          <input
            type="text"
            class="w-full h-5 text-xs text-center text-gray-800 bg-white border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            @focus="onFocusFirstPair()"
            v-model="userInputFirstPair"
            @keydown="monitorKeysFirstPair"
            tabindex="0">
          <div
            v-if="focusedFirstPair"
            class="absolute z-50 text-xs bg-gray-200 dark:bg-gray-600">
            <div
              v-for="(key, value) in dynamicUserFirstInput"
              v-bind:key="value"
              v-on:click="fillBarFirstInput(key)"
              class="px-2 text-xs hover:bg-gray-600 hover:text-gray-50 rounded-md"
              :class="{ ['bg-azure']: value === selectedFirstPair }">
              {{ key[0] }} - {{ key[1] }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center rounded-xl">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Buying
          </label>
          <input
            type="text"
            class="w-full h-5 text-xs text-center text-gray-800 bg-white border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            @focus="onFocusSecondPair()"
            v-model="userInputSecondPair"
            @keydown="monitorKeysSecondPair"
            tabindex="0">
          <div
            v-if="focusedSecondPair"
            class="absolute z-50 text-xs bg-gray-200 dark:bg-gray-600">
            <div
              v-for="(key, value) in dynamicUserSecondInput"
              v-bind:key="value"
              v-on:click="fillBarSecondInput(key)"
              class="px-2 text-xs hover:bg-gray-600 hover:text-gray-50 rounded-md"
              :class="{ ['bg-azure']: value === selectedSecondPair }">
              {{ key[0] }} - {{ key[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(subtrade, i) in subtrades"
      :key="subtrade.Timestamp"
      class="p-1 px-3 bg-verysoftcyan dark:bg-sandpurple">
      <div class="text-xs font-bold text-center dark:text-gray-200">
        Subtrade {{ i + 1 }}
      </div>
      <div class="mb-2 text-center grid grid-cols-6">
        <div class="flex flex-col col-span-2">
          <label class="text-gray-500 text-xxs dark:text-gray-200">
            Buy/Sell
          </label>
          <select
            class="w-full h-5 text-xs text-gray-800 bg-white border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="subtrade.Type">
            <option value="BUY">
              BUY
            </option>
            <option value="SELL">
              SELL
            </option>
          </select>
        </div>
        <div class="flex flex-col ml-2 col-span-4">
          <label class="text-gray-500 text-xxs dark:text-gray-200">
            Date/Time
          </label>
          <input
            name="date"
            type="text"
            onfocus="(this.type='datetime-local')"
            onfocusout="(this.type='text')"
            class="w-full h-5 text-xs border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="subtrade.CreatedAt">
        </div>
      </div>
      <div class="flex flex-col mb-2">
        <label class="text-gray-500 text-xxs dark:text-gray-200">
          Trade reason / Description
        </label>
        <input
          class="w-full h-5 text-xs text-gray-800 border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
          v-model="subtrade.Reason">
      </div>
      <div class="flex flex-row mb-2">
        <div class="flex flex-col">
          <label class="text-gray-500 text-xxs dark:text-gray-200">
            Quantity
          </label>
          <input
            min="0.00000000001"
            type="number"
            class="w-full h-5 text-xs text-gray-800 border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="subtrade.Quantity">
        </div>
        <div class="flex flex-col ml-2">
          <label class="text-gray-500 text-xxs dark:text-gray-200">
            Average price
          </label>
          <input
            min="0.00000000001"
            type="number"
            class="w-full h-5 text-xs text-gray-800 border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="subtrade.AvgPrice">
        </div>
        <div class="flex flex-col ml-2">
          <label class="text-gray-500 text-xxs dark:text-gray-200">
            Total
          </label>
          <input
            min="0.00000000001"
            type="number"
            class="w-full h-5 text-xs text-gray-800 border border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="subtrade.Total">
        </div>
      </div>
      <div class="flex justify-around ml-2 col-span-1">
        <div class="flex align-middle">
          <button
            @click="addSubtrade()"
            title="Add Subtrade"
            class="transform scale-50">
            <AddSubtradeOpen class="text-green-400 fill-current dark:text-green-800"/>
          </button>
          <button
            v-if="subtrades.length > 1"
            @click="removeSubtrade(i)"
            title="Remove Subtrade"
            class="transform scale-50">
            <RemoveSubtradeOpen class="text-red-400 fill-current dark:text-red-800"/>
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-2 mb-4">
      <button
        @click="confirmInsertTrade()"
        class="p-1 mr-1 text-xs text-white rounded-lg bg-blueshine dark:bg-verysoftcyan dark:text-gray-800">
        CONFIRM
      </button>
      <button
        @click="cancelInsertTrade()"
        class="p-1 text-xs rounded-lg bg-verysoftcyan dark:bg-blueshine dark:text-gray-200">
        CANCEL
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit, Watch, Prop } from 'vue-property-decorator';
  import axios from "axios";
  import AddSubtradeOpen from '@/components/svg/AddSubtradeOpen.vue'
  import RemoveSubtradeOpen from '@/components/svg/RemoveSubtradeOpen.vue'
  @Component({
    components: {
      AddSubtradeOpen,
      RemoveSubtradeOpen
    }
  })
  export default class TradeNew extends Vue {
    @Prop() isMobile!: boolean;
    focusedFirstPair: boolean = false;
    focusedSecondPair: boolean = false;
    userInputFirstPair: string = "";
    userInputSecondPair: string = "";
    selectedFirstPair: number = 0;
    selectedSecondPair: number = 0;
    cryptoPairs: object = {};
    exchange: string = '';
    subtrades: object[] = [
      {
        CreatedAt: null,
        Type: null,
        Reason: null,
        AvgPrice: null,
        Quantity: null,
        Total: null,
      }
    ]
    onFocusFirstPair() {
      this.focusedFirstPair = true;
    }
    onFocusSecondPair() {
      this.focusedSecondPair = true;
    }
    get dynamicUserFirstInput() {
      return this.dynamicUserInput(this.userInputFirstPair);
    }
    get dynamicUserSecondInput() {
      return this.dynamicUserInput(this.userInputSecondPair);
    }
    dynamicUserInput(userInputPair: string) {
      const tempDict: any[][] = [];
      let counter = 0;
      if (userInputPair != "") {
        for (var key in this.cryptoPairs) {
          if (counter < 10) {
            let symbol: string = this.cryptoPairs[key]['Symbol'];
            let name: string = this.cryptoPairs[key]['Name'];
            let tempValue = symbol + name;
            if (tempValue.indexOf(userInputPair) > -1) {
              tempDict.push([
                symbol,
                name
              ])
              counter = counter + 1;
            }
          }
        }
      }
      return tempDict;
    }
    fillBarFirstInput(key: object) {
      this.userInputFirstPair = key[0] + ' - ' + key[1];
    }
    fillBarSecondInput(key: object) {
      this.userInputSecondPair = key[0] + ' - ' + key[1];
    }
    monitorKeysFirstPair(event: any) {
      this.monitorKeysPair('first', event);
    }
    monitorKeysSecondPair(event: any) {
      this.monitorKeysPair('second', event);
    }
    monitorKeysPair(pairOrder: string, event: any) {
      switch (event.keyCode) {
        case 13:
          if (pairOrder == 'first') {
            this.userInputFirstPair = this.dynamicUserFirstInput[this.selectedFirstPair].join(' - ');
          } else if (pairOrder == 'second') {
            this.userInputSecondPair = this.dynamicUserSecondInput[this.selectedSecondPair].join(' - ');
          }
          break;
        case 38:
          if (pairOrder == 'first') {
            if (this.selectedFirstPair > 0) {
              this.selectedFirstPair--;
            }
          } else if (pairOrder == 'second') {
            if (this.selectedSecondPair > 0) {
              this.selectedSecondPair--;
            }
          }
          break;
        case 40:
          if (pairOrder == 'first') {
            if (this.selectedFirstPair < Object.keys(this.dynamicUserFirstInput).length - 1) {
              this.selectedFirstPair++;
            }
          } else if (pairOrder == 'second') {
            if (this.selectedSecondPair < Object.keys(this.dynamicUserSecondInput).length - 1) {
              this.selectedSecondPair++;
            }
          }
          break;
      }
    }
    get firstPairCoinId() {
      return this.managePairCoinId(this.userInputFirstPair);
    } 
    get secondPairCoinId() {
      return this.managePairCoinId(this.userInputSecondPair);
    } 
    managePairCoinId(userInputPair: string) {
      let selectedPairId = 0;
      var symbolUserInput = userInputPair.split(' - ')[0];
      var nameUserInput = userInputPair.split(' - ')[1];
      for (var key in this.cryptoPairs) {
        if (
          this.cryptoPairs[key]['Symbol'] == symbolUserInput &&
          this.cryptoPairs[key]['Name'] == nameUserInput) {
          selectedPairId = parseInt(key);
        }
      }
      return selectedPairId;
    }
    @Watch('subtrades', { deep: true })
    watchTotalSpent(new_value: number, _: number) {
      for (let i = 0; i < this.subtrades.length; i++) {
        this.subtrades[i]["Total"] = new_value[i]["AvgPrice"] * new_value[i]["Quantity"];   
      }
    }
    @Watch('firstPairCoinId')
    watchFirstPair(_: number, __: number) {
      if (this.secondPairCoinId > 0) {
        this.getLatestPairRate();
      }
    }
    @Watch('secondPairCoinId')
    watchSecondPair(_: number, __: number) {
      if (this.firstPairCoinId > 0) {
        this.getLatestPairRate();
      }
    }
    getLatestPairRate() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_pair_ratio',
        this.firstPairCoinId,
        this.secondPairCoinId
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
      }).then(response => {
        if (response.status === 200) {
          this.subtrades[0]['AvgPrice'] = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    created() {
      this.cryptoPairs = JSON.parse(
        localStorage.getItem('cryptoPairs') || '{}');
    }
    addSubtrade() {
      this.subtrades.push(
        {
          CreatedAt: null,
          Type: null,
          Reason: null,
          Quantity: null,
          AvgPrice: null,
          Total: null 
        }
      );
    }
    removeSubtrade(i: number) {
      this.subtrades.splice(i, 1);
    }
    validate() {
      var m: string[] = [];
      if (!this.exchange) m.push("-Exchange missing");
      if (!this.firstPairCoinId) m.push("-First Pair missing");
      if (!this.secondPairCoinId) m.push("-Second Pair missing");
      for (var i in this.subtrades) {
        var tId = parseInt(i) + 1;
        var tS = this.subtrades[i];
        if (!tS['Quantity'] || tS['Quantity'] <= 0) m.push("-Wrong Quantity in subtrade " + tId);
        if (!tS['AvgPrice'] || tS['AvgPrice'] <= 0) m.push("-Wrong AvgPrice in subtrade " + tId);
        if (!tS['Total'] || tS['Total'] <= 0) m.push("-Wrong Total in subtrade " + tId);
        if (!tS['Reason']) m.push("-Reason missing in subtrade " + tId);
        if (!tS['Type']) m.push("-Type missing in subtrade " + tId);
        if (!tS['CreatedAt']) m.push("-Wrong Timestamp in subtrade " + tId);
      }
      return m;
    }
    confirmInsertTrade() {
      var validateMessages = this.validate();
      if (validateMessages.length <= 0) {
        let newTrade = {
          Exchange: this.exchange,
          FirstPair: this.firstPairCoinId,
          SecondPair: this.secondPairCoinId,
          Subtrades: this.subtrades
        }
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'insert_trade'
        ].join('/');
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: request_url,
          data: newTrade
        }).then(response => {
          if (response.status === 200) {
            this.cancelInsertTrade();
          }
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        alert("Please check the following errors:\n" + validateMessages.join("\n"));
      }
    }
    @Emit('closeNewTradeSection')
    cancelInsertTrade(){}
  }
</script>
