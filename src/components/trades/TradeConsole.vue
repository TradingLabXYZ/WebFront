<template>
  <div>
    <div
      v-if="isUserConnected && isUserProfile && isNewTrade"
      class="flex justify-center mt-5 mb-5">
      <TradeNew @closeNewTradeSection="cancelInsertTrade"/>
    </div>
    <div
      v-for="(trade, q) in trades"
      :key="'A' + q">
      <div class="py-4 bg-sandpurple mt-8 flex flex-row xs:justify-evenly lg:justify-center text-xl font-medium tracking-wide text-center text-cream lg:space-x-16 align-middle items-center xs:mx-1">
        <div
          v-if="isUserProfile || visibility['SubtradesAll']"
          class="text-gray-700">
          <button
            @click="toggle(trade['Code'])"
            title="Expand/Collapse trade"
            type="button">
            <ExpandTrade v-if="opened.includes(trade['Code'])"/>
            <CollapseTrade v-else/>
          </button>
        </div>
        <div class="flex flex-col xs:ml-2">
          <div class="flex flex-row justify-center align-middle items-center">
            <img
              :src="trade['FirstPairUrlIcon']"
              class="xs:w-6 lg:w-10 xs:h-6 lg:h-10"
              alt="first crypto icon">
            <span class="hidden lg:block font-extralight">
              {{ trade['FirstPairSymbol'] }}
            </span>
          </div>
          <div class="flex flex-row justify-center align-middle items-center">
            <img
              :src="trade['SecondPairUrlIcon']"
              class="xs:w-6 lg:w-10 xs:h-6 lg:h-10"
              alt="first crypto icon">
            <span class="hidden lg:block font-extralight">
              {{ trade['SecondPairSymbol'] }}
            </span>
          </div>
        </div>
        <div class="flex-col hidden lg:block">
          <div class="xs:text-xs lg:text-md font-extralight">
            Exchange
          </div>
          <div class="xs:text-xs lg:text-2xl">
            {{ trade['Exchange'] }}
          </div>
        </div>
        <div
          v-bind:id="trade['Code']"
          class="flex flex-col">
          <div class="xs:text-xs lg:text-md font-extralight">
            Price
          </div>
          <div class="xs:text-base lg:text-3xl">
            {{ trade['CurrentPrice'] }}
          </div>
          <div class="xs:text-xs lg:text-md font-extralight">
            {{ trade['FirstPairSymbol'] }} / {{ trade['SecondPairSymbol'] }}
          </div>
        </div>
        <div
          v-if="isUserProfile || visibility['TradeQtyAvailable']"
          class="flex flex-col">
          <div class="xs:text-xs lg:text-md font-extralight">
            Qty Available
          </div>
          <div class="xs:text-base lg:text-3xl">
            {{ trade['QtyAvailable'] }}
          </div>
          <div class="xs:text-xs lg:text-md font-extralight">
            {{ trade['SecondPairSymbol'] }}
          </div>
        </div>
        <div
          v-if="isUserProfile || visibility['TradeValue']"
          class="flex flex-col xs:hidden lg:block">
          <div class="xs:text-xs lg:text-md font-extralight">
            $ Value
          </div>
          <div class="xs:text-base lg:text-3xl">
            {{ trade['TotalValueUsdS'] }}
          </div>
          <div class="xs:text-xs lg:text-md font-extralight">
            USD
          </div>
        </div>
        <div
          v-if="isUserProfile || visibility['TradeReturn']"
          class="flex flex-col">
          <div class="xs:text-xs lg:text-md font-extralight">
            Return
          </div>
          <div class="xs:text-base lg:text-3xl">
            {{ trade['TotalReturnS'] }}
          </div>
          <div class="xs:text-xs lg:text-md font-extralight">
            {{ trade['FirstPairSymbol'] }}
          </div>
        </div>
        <div
          v-if="isUserProfile || visibility['TradeRoi']"
          class="flex flex-col"
          :class="trade['Roi'] > 0 ? 'text-lagune' : 'text-dutchorange'">
          <div class="xs:text-xs lg:text-md font-extralight">
            ROI
          </div>
          <div class="xs:text-base lg:text-3xl">
            {{ trade['Roi'] + "%" }}
          </div>
        </div>
        <div
          v-if="isUserConnected && isUserProfile"
          class="">
          <button
            v-if="isUserConnected && isUserProfile"
            @click="deleteTrade(trade)"
            class="m-2"
            title="Delete trade"
            type="button">
            <DeleteTrade/>
          </button>
        </div>
      </div>
      <div
        v-if="opened.includes(trade['Code']) && (isUserProfile || visibility['SubtradesAll'])"
        class="mt-2 text-cream bg-universelight 11/12 m-auto xs:p-1 lg:p-2 space-y-1">
        <div
          v-for="(subtrade, i) in trade['Subtrades']"
          :key="i"
          class="bg-deepmagenta flex xs:flex-col lg:flex-row xs:text-xs lg:text-xl w-full m-auto justify-around
          lg:align-middle lg:items-center py-2 rounded">
          <div class="text-cream w-12 hidden lg:block pl-2">
            {{ i + 1}}
          </div>
          <div class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine">
            <div class="text-center text-sm font-extralight">
              Date
            </div>
            <input
              :disabled="!isUserConnected || !isUserProfile"
              name="formTimestamp" 
              placeholder="Timestamp"
              type="datetime-local"
              class="text-center text-cream bg-deepmagenta pb-0"
              v-model="subtrade.CreatedAt"
              @change="updateSubtrade(subtrade)">
          </div>
          <div class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine">
            <div class="text-center text-sm font-extralight">
              Order
            </div>
            <select
              :disabled="!isUserConnected || !isUserProfile"
              name="formType" 
              class="text-center text-cream bg-deepmagenta pb-1"
              v-model="subtrade.Type"
              @change="updateSubtrade(subtrade)">
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>
          <div
            v-if="isUserProfile || visibility['SubtradeReasons']"
            class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine">
            <div class="text-center text-sm font-extralight">
              Reason
            </div>
            <input
              :disabled="!isUserConnected || !isUserProfile"
              name="formReason" 
              placeholder="Insert a reason" 
              type="text"
              class="text-center text-cream bg-deepmagenta pb-1"
              v-model="subtrade.Reason"
              @change="updateSubtrade(subtrade)">
          </div>
          <div
            v-if="isUserProfile || visibility['SubtradeQuantity']"
            class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine lg:w-32">
            <div class="text-center text-sm font-extralight">
              Quantity
            </div>
            <input 
              :disabled="!isUserConnected || !isUserProfile"
              min="0.00000000001"
              name="formQuantity" 
              placeholder="Quantity"
              type="number"
              step="any"
              class="text-center text-cream bg-deepmagenta pb-1"
              v-model.number="subtrade.Quantity"
              @change="updateSubtrade(subtrade)">
          </div>
          <div 
            v-if="isUserProfile || visibility['SubtradeAvgPrice']"
            class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine lg:w-32">
            <div class="text-center text-sm font-extralight">
              Avg Price
            </div>
            <input
              :disabled="!isUserConnected || !isUserProfile"
              min="0.00000000001"
              name="formAvgPrice" 
              placeholder="Avg Price"
              type="number"
              step="any"
              class="text-center text-cream bg-deepmagenta pb-1"
              v-model.number="subtrade.AvgPrice"
              @change="updateSubtrade(subtrade)">
          </div>
          <div 
            v-if="isUserProfile || visibility['SubtradeTotal']" 
            class="flex xs:flex-row lg:flex-col justify-center border-b border-magentashine lg:w-32">
            <div class="text-center text-sm font-extralight">
              Total
            </div>
            <input
              :disabled="!isUserConnected || !isUserProfile"
              min="0.00000000001"
              name="formTotal" 
              placeholder="Total"
              type="number"
              step="any"
              class="text-center text-cream bg-deepmagenta pb-1"
              v-model.number="subtrade.Total"
              @change="updateSubtrade(subtrade)">
          </div>
          <div
            v-if="isUserConnected && isUserProfile"
            class="flex flex-row lg:flex-col justify-center">
            <button
              v-if="trade['Subtrades'].length > 1"
              @click="removeSubtrade(subtrade)"
              title="Remove subtrade"
              type="button"
              class="m-1">
              <RemoveSubtradeOpen class="text-red-800 fill-current"/>
            </button>
            <button
              v-if="i == (trade['Subtrades'].length - 1)"
              @click="insertSubtrade(trade)"
              title="Insert subtrade"
              type="button"
              class="m-1">
              <AddSubtradeOpen class="text-green-800 fill-current"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="isUserConnected && isUserProfile || isNewTrade"
      class="text-center bg-universe text-cream mt-4">
      <button
        @click="insertTrade()"
        title="Insert a new trade"
        class="p-1 ml-4 text-6xl text-gray-400 rounded hover:text-gray-800">
        <InsertTrade class="text-gray-200 stroke-current stroke-2"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from "axios";
import TradeNew from '@/components/trades/TradeNew.vue';
import InsertTrade from '@/components/svg/InsertTrade.vue';
import ExpandTrade from '@/components/svg/ExpandTrade.vue';
import CollapseTrade from '@/components/svg/CollapseTrade.vue';
import CloseTrade from '@/components/svg/CloseTrade.vue';
import OpenTrade from '@/components/svg/OpenTrade.vue';
import DeleteTrade from '@/components/svg/DeleteTrade.vue';
import AddSubtradeOpen from '@/components/svg/AddSubtradeOpen.vue';
import RemoveSubtradeOpen from '@/components/svg/RemoveSubtradeOpen.vue';
@Component({
  components: {
    TradeNew,
    InsertTrade,
    ExpandTrade,
    CollapseTrade,
    CloseTrade,
    OpenTrade,
    DeleteTrade,
    AddSubtradeOpen,
    RemoveSubtradeOpen
  }
})
export default class TradeOpen extends Vue {
  opened: number[] = [];
  isNewTrade: boolean = false;
  @Prop() isUserConnected!: boolean;
  @Prop() trades!: object[];
  @Prop() isUserProfile!: boolean;
  @Prop() visibility!: object;
  validateSubtrade(subtrade: object) {
    var m = '';
    if (!subtrade['Quantity'] || subtrade['Quantity'] <= 0) m = "Wrong Quantity";
    if (!subtrade['AvgPrice'] || subtrade['AvgPrice'] <= 0) m = "Wrong AvgPrice";
    if (!subtrade['Total'] || subtrade['Total'] <= 0) m = "Wrong Total in subtrade";
    if (!subtrade['Reason']) m = "Reason missing in subtrade";
    if (!subtrade['Type']) m = "Type missing in subtrade";
    if (!subtrade['CreatedAt']) m = "Wrong Timestamp in subtrade";
    return m;
  }
  updateSubtrade(subtrade: object) {
    var validateMessage = this.validateSubtrade(subtrade);
    if (validateMessage == '') {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'update_subtrade'
      ].join('/');
      axios({
        method: "POST",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
        data: subtrade
      }).catch(function (error) {
        console.log(error);
      })
    } else {
      alert("Please check the following errors:\n" + validateMessage);
    }
  }
  deleteTrade(trade: object) {
    var answer = window.confirm("Are you sure deleting this trade?");
    if (answer) {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'delete_trade',
        trade['Code']
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
  insertSubtrade(trade: object) {
    let request_url = [
      process.env.VUE_APP_HTTP_URL,
      'insert_subtrade',
      trade['Code']
    ].join('/');
    axios({
      method: "GET",
      headers: {
        Authorization: "Bearer " + document.cookie,
        "Access-Control-Allow-Origin": "*",
      },
      url: request_url
    }).catch(function (error) {
      console.log(error);
    })
  }
  removeSubtrade(subtrade: object) {
    var answer = window.confirm("Are you sure deleting this subtrade?");
    if (answer) {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'delete_subtrade',
        subtrade['Code']
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
  insertTrade() {
    this.isNewTrade = true;
  }
  cancelInsertTrade() {
    this.isNewTrade = false;
  }
  toggle(id: number) {
    const index = this.opened.indexOf(id);
    if (index > -1) {
      this.opened.splice(index, 1)
    } else {
      this.opened.push(id)
    }
  }
}
</script>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type="date"]::-webkit-inner-spin-button,    
  input[type="date"]::-webkit-clear-button { display: none; }
</style>
