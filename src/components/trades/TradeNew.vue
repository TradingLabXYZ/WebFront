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
            TEST
          </label>
          <input
            type="text"
            class="w-full p-2 border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            @focus="onFocus()"
            v-model="userInput"
            @keydown="test"
            tabindex="0">
          <div
            class="absolute z-50 bg-gray-200">
            <div v-if="focused">
              <div
                class="px-2 hover:bg-gray-600 hover:text-gray-50 rounded-md"
                v-for="(key, value) in dynamicUserInput"
                :class="{ focus: value === focus }"
                v-bind:key="value"
                v-on:click="fillBar(key)">
                {{ key[0] }} - {{ key[1] }}
              </div>
            </div>
          </div>
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel dark:text-gray-200">
            Selling
          </label>
          <select
            class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="firstPairCoinId">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="key.CoinId"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel dark:text-gray-200">
            Buying
          </label>
          <select
            class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500 dark:bg-deepmagenta dark:text-gray-200"
            v-model="secondPairCoinId">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="key.CoinId"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
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
      <div class="grid grid-cols-4 space-x-1">
        <div class="flex flex-col justify-center text-center rounded-xl col-span-2">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Exchange
          </label>
          <input
            class="h-5 text-xs text-gray-800 border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            v-model="exchange">
        </div>
        <div class="flex flex-col items-center justify-center rounded-xl col-span-1">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Selling
          </label>
          <select
            class="w-full h-5 text-xs text-gray-800 bg-white border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            v-model="firstPairCoinId">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="key.CoinId"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col items-center justify-center col-span-1 rounded-xl">
          <label class="text-gray-500 text-xxs text-subtradelabel dark:text-gray-200">
            Buying
          </label>
          <select
            class="w-full h-5 text-xs text-gray-800 bg-white border border-gray-200 dark:bg-deepmagenta dark:text-gray-200"
            v-model="secondPairCoinId">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="key.CoinId"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
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
    focused: boolean = false;
    userInput: string = "";
    cryptoPairs: object = {};
    exchange: string = '';
    firstPairCoinId: number = 0;
    secondPairCoinId: number = 0;
    focus: number = 0;
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
    onFocus() {
      this.focused = true;
    }
    get dynamicUserInput() {
      const tempDict: any[][] = [];
      let counter = 0;
      if (this.userInput != "") {
        for (var key in this.cryptoPairs) {
          if (counter < 10) {
            let tempValue = key + this.cryptoPairs[key]['Name'];
            if (tempValue.indexOf(this.userInput) > -1) {
              let symbol: string = this.cryptoPairs[key]['Symbol'];
              let name: string = this.cryptoPairs[key]['Name'];
              console.log(symbol,name)
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
    fillBar(key: object) {
      this.userInput = key[0] + ' - ' + key[1];
    }
    test(event: any) {
      console.log(this.focus);
      console.log(event)
      switch (event.keyCode) {
        case 13:
          this.userInput = this.dynamicUserInput[this.focus][0] + ' - ' + this.dynamicUserInput[this.focus][1];
        case 38:
          console.log("UP")
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus > 0) {
            this.focus--;
          }
          break;
        case 40:
          console.log("DOWN")
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus < Object.keys(this.dynamicUserInput).length - 1) {
            this.focus++;
          }
          break;
      }
    }
    @Watch('subtrades', { deep: true })
    watchTotalSpent(new_value: number, old_value: number) {
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

<style>
div.focus {
  border: 1px solid blue;
}
</style>
