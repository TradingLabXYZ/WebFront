<template>
  <div class="mb-20">
    <div id="step1" class="p-10 mt-8 bg-gray-100">
      <div class="py-3 mt-1 mb-8 text-xl font-bold text-center bg-indigo-200">
        STEP 1
      </div>
      <div class="flex flex-row items-center justify-around">
        <label class="">
          Select number of months<br>(every month 2% discount)
        </label>
        <input
          placeholder="Months"
          max="12"
          min="1"
          type="number"
          @change="checkMonthsMax"
          class="w-20 h-8 p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model.number="numberMonths">
      </div>
      <div class="mt-8 text-xl text-center">
        <div class="m-1 mt-3">
          <b class="text-base">MONTHLY PRICE</b>: {{ discountedMonthlyPrice.toFixed(2) }} $
        </div>
        <div class="m-1 mt-3">
          <b class="text-base">TO PAY $</b>: {{ (numberMonths * discountedMonthlyPrice).toFixed(2) }} $
        </div>
        <div class="m-1 mt-5 text-xs">
          Current XLM price around: {{ stellarPrice.toFixed(5) }} USD/XLM
        </div>
        <div class="m-1">
          <b class="text-base">TO PAY XLM</b>: {{ totalXlmToPay.toFixed(2) }} XLM
        </div>
      </div>
      <div v-if="numberMonths > 0" class="flex justify-center mt-5 mb-1">
        <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="completeStep1()">
          Next Step
        </button>
      </div>
    </div>

    <div v-if="isStep1Completed" id="step2" class="p-10 mt-8 bg-gray-100">
      <div class="py-3 mt-1 mb-8 text-xl font-bold text-center bg-indigo-200">
        STEP 2
      </div>
      <div class="flex flex-col items-center">
        <div>
          Amount XLM to be sent:
        </div>
        <div class="flex flex-row items-center m-3 text-xl"> 
          <b id="totalXlmToPay">
            {{ totalXlmToPay }}
          </b>
          <button @click="copyTextToClipboard('totalXlmToPay')" class="h-5 px-2 ml-2 text-xs bg-gray-300 hover:bg-gray-500">
            Copy
          </button>
        </div>
        <div>
          Send XLM to the following address:
        </div>
        <div class="flex flex-row items-center m-3 text-xl"> 
          <b id="depositWallet">
            {{ depositWallet }}
          </b>
          <button @click="copyTextToClipboard('depositWallet')" class="h-5 px-2 ml-2 text-xs bg-gray-300 hover:bg-gray-500">
            Copy
          </button>
        </div>
        <div>
          Insert this MEMO:
        </div>
        <div class="flex flex-row items-center m-3 text-xl"> 
          <b id="depositMemo">
            {{  depositMemo }}
          </b>
          <button @click="copyTextToClipboard('depositMemo')" class="h-5 px-2 ml-2 text-xs bg-gray-300 hover:bg-gray-500">
            Copy
          </button>
        </div>
      </div>
      <div class="flex justify-center mt-5 mb-1">
        <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="completeStep2()">
          Next Step
        </button>
      </div>
    </div>

    <div v-if="isStep2Completed" id="step3" class="p-10 mt-8 bg-gray-100">
      <div class="py-3 mt-1 mb-8 text-xl font-bold text-center bg-indigo-200">
        STEP 3
      </div>
      <div class="flex flex-row items-center justify-around">
        <label class="">
          Insert the transaction ID
        </label>
        <input
          placeholder="Stellar Transaction ID"
          type="text"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="stellarTransaction">
      </div>
      <div class="mt-5 mb-1" v-if="stellarTransaction.length">
        <div class="flex justify-around">
          <button class="p-3 mt-3 bg-green-400 hover:bg-green-600" @click="checkTransaction()">
            CHECK
          </button>
        </div>
        <div class="flex justify-around">
          <div v-if="isTransactionStatusLoading" class="mt-10 loader"></div>
        </div>
        <div class="py-6 font-bold text-center">
          <div v-if="transactionStatus == 'OK'" class="px-10 py-3 mt-10 bg-green-400">
            🙌 Success 🙌
          </div>
          <div v-if="transactionStatus == 'KO'" class="px-10 py-3 mt-10 bg-red-400">
            Ouch something went wrong<br>
            <span class="text-xs">
              Please contact us on Discord
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data: function() {
      return {
        stellarPrice: 0,
        isStep1Completed: false,
        isStep2Completed: false,
        isStep3Completed: false,
        depositMemo: "",
        depositWallet: "",
        numberMonths: 1,
        monthlyDiscount: 2,
        baseMonthlyPrice: 4.99,
        stellarTransaction: "",
        isTransactionStatusLoading: false,
        transactionStatus: null
      }
    },
    created: function() {
      this.getStellarPrice();
    },
    computed: {
      discountedMonthlyPrice: function () {
        if (this.numberMonths == 1) {
          return this.baseMonthlyPrice;
        } else {
          return this.baseMonthlyPrice * (100 - this.numberMonths * this.monthlyDiscount) / 100;
        }
      },
      totalXlmToPay: function() {
        return Math.round((this.discountedMonthlyPrice * this.numberMonths / this.stellarPrice) * 100) / 100;
      }
    },
    methods: {
      checkMonthsMax() {
        if(this.numberMonths > 12){
          this.numberMonths = 12;
        }
        if(this.numberMonths < 1){
          this.numberMonths = 1;
        }
      },
      getStellarPrice() {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/stellar_price",
        }).then(response => {
          if (response.status === 200) {
            this.stellarPrice = parseFloat(response.data.Price);
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      completeStep1() {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/transaction_credentials",
        }).then(response => {
          if (response.status === 200) {
            this.isStep1Completed = true;
            this.depositWallet = response.data.DepositAddress;
            this.depositMemo = response.data.Memo;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      completeStep2() {
        this.isStep2Completed = true;
      },
      checkTransaction() {
        this.transactionStatus = "";
        this.isTransactionStatusLoading = true;
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/validate_tx",
          data: { 
            Id: this.stellarTransaction,
            Memo: this.depositMemo,
            Months: this.numberMonths,
            Amount: this.totalXlmToPay,
            Blockchain: "Stellar",
            Currency: "XLM"
          }
        }).then(response => {
          if (response.status === 200) {
            this.isTransactionStatusLoading = false;
            if (response.data == "KO") {
              this.transactionStatus = "KO";
            } else {
              this.transactionStatus = "OK";
            }
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      copyTextToClipboard(element_id) {
        var copyText = document.getElementById(element_id);
        navigator.clipboard.writeText(copyText.innerText);
      }
    }
  }
</script>

<style>
  .loader {
    border: 8px solid #3428db;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
