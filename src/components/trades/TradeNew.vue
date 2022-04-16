<template>
  <div
    class="xs:w-5/6 sm:w-1/2 p-5 mb-5 rounded-3xl bg-universelight text-cream">
    <div class="p-1 text-2xl font-bold text-center text-cream">
      Add a new trade
    </div>
    <div class="flex xs:flex-col sm:flex-row mb-2 justify-center texr">
      <div class="p-2 rounded-xl">
        <label class="text-xs text-cream">
          Exchange
        </label>
        <input
          class="w-full p-2 border border-gray-500 text-cream bg-deepmagenta"
          v-model="exchange">
      </div>
      <div class="p-2 rounded-xl">
        <label class="text-xs text-cream">
          Selling
        </label>
        <input
          type="text"
          class="w-full p-2 border border-gray-500 text-cream bg-deepmagenta"
          @focus="onFocusFirstPair()"
          v-model="userInputFirstPair"
          @keydown="monitorKeysFirstPair"
          tabindex="0">
        <div
          v-if="focusedFirstPair"
          class="absolute z-50 bg-gray-600">
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
      <div class="p-2 rounded-xl">
        <label class="text-xs text-cream">
          Buying
        </label>
        <input
          type="text"
          class="w-full p-2 border border-gray-500 text-cream bg-deepmagenta"
          @focus="onFocusSecondPair()"
          v-model="userInputSecondPair"
          @keydown="monitorKeysSecondPair"
          tabindex="0">
        <div
          v-if="focusedSecondPair"
          class="absolute z-50 bg-gray-600">
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
      :key="subtrade['Timestamp']"
      class="rounded-xl">
      <div class="rounded-3xl bg-sandpurple py-4">
        <div class="xs:text-xl sm:text-2xl font-bold text-center text-cream">
          Subtrade {{ i + 1 }}
        </div>
        <div class="flex justify-center items-center align-middle xs:flex-col sm:flex-row xs:space-y-2">
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Date/Time
            </label>
            <input
              name="date"
              type="text"
              onfocus="(this.type='datetime-local')"
              onfocusout="(this.type='text')"
              class="w-full p-2 border border-gray-200 text-cream bg-deepmagenta"
              v-model="subtrade['CreatedAt']">
          </div>
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Buy/Sell
            </label>
            <select
              class="w-full p-2 border border-gray-200 text-cream bg-deepmagenta"
              v-model="subtrade['Type']">
              <option value="BUY">
                BUY
              </option>
              <option value="SELL" v-if="i > 0">
                SELL
              </option>
            </select>
          </div>
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Trade reason / Description
            </label>
            <input
              class="w-full p-2 border border-gray-200 text-cream bg-deepmagenta"
              v-model="subtrade['Reason']">
          </div>
        </div>
        <div class="flex justify-center items-center align-middle xs:flex-col sm:flex-row xs:space-y-2">
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Quantity
            </label>
            <input
              min="0.00000000001"
              type="number"
              class="w-full p-2 border border-gray-200 text-cream bg-deepmagenta"
              v-model="subtrade['Quantity']">
          </div>
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Average price
            </label>
            <input
              min="0.00000000001"
              type="number"
              class="w-full p-2 border border-gray-200 text-cream bg-deepmagenta"
              v-model="subtrade['AvgPrice']">
          </div>
          <div class="mx-4 rounded-xl">
            <label class="text-xs text-cream">
              Total
            </label>
            <input
              min="0.00000000001"
              type="number"
              class="w-full p-2 border border-gray-500 text-cream bg-deepmagenta"
              v-model="subtrade['Total']">
          </div>
        </div>
      </div>
      <div class="flex justify-around ml-2 col-span-1">
        <div class="flex align-middle">
          <button
            @click="addSubtrade()"
            title="Add Subtrade"
            class="p-1">
            <AddSubtradeOpen class="text-green-800 fill-current"/>
          </button>
          <button
            v-if="subtrades.length > 1"
            @click="removeSubtrade(i)"
            title="Remove Subtrade"
            class="">
            <RemoveSubtradeOpen class="text-red-800 fill-current"/>
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="confirmInsertTrade()"
        class="p-2 mr-2 text-lg font-bold rounded-lg bg-magentashine">
        CONFIRM
      </button>
      <button
        @click="cancelInsertTrade()"
        class="p-2 ml-2 text-lg font-bold rounded-lg bg-blueshine">
        CANCEL
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
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
