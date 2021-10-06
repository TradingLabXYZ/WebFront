<template>
  <div class="mt-8 text-xl font-bold">
    STEP 1
  </div>
  <div class="">
    <label class="">
      Select number of months (every additional month, 2% discount)
    </label>
    <input
      placeholder="Months"
      max=12
      min=1
      type="number"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="numberMonths">
  </div>
  <div class="mt-8 text-xl">
    <div class="m-1 mt-3">
      MONTHLY PRICE: {{ discountedMonthlyPrice.toFixed(2) }}
    </div>
    <div class="m-1 mt-3">
      TO PAY USD: {{ (numberMonths * discountedMonthlyPrice).toFixed(2) }} $
    </div>
    <div class="m-1 mt-5 text-xs">
      Current XLM price: {{ stellarPrice }} XLM/USD
    </div>
    <div class="m-1">
      TO PAY XLM: {{ (numberMonths * discountedMonthlyPrice / stellarPrice).toFixed(2) }} XLM
    </div>
  </div>
  <div v-if="numberMonths > 0" class="mt-5 mb-28">
    <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="completeStep1()">
      Next Step
    </button>
    <div v-if="isStep1Completed">
      <div class="mt-5 text-xl font-bold">
        STEP 2
      </div>
      <div>
        Send XLM to the following Address:
      </div>
      <div class="flex flex-row items-center">
        <div class="m-3 text-xl" id="depositWallet">
          <b>{{ depositWallet }}</b>
        </div>
        <button @click="copyTextToClipboard('depositWallet')" class="h-5 text-xs bg-gray-300 hover:bg-gray-500">
          Copy
        </button>
      </div>
      <div class="m-3 text-xl">
        Insert this MEMO:
      </div>
      <div class="flex flex-row items-center">
        <div class="m-3 text-xl" id="depositMemo">
          <b>{{  depositMemo }}</b>
        </div>
        <button @click="copyTextToClipboard('depositMemo')" class="h-5 text-xs bg-gray-300 hover:bg-gray-500">
          Copy
        </button>
      </div>
      <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="completeStep2()">
        Next Step
      </button>
      <div v-if="isStep2Completed">
        <div class="mt-8 text-xl font-bold">
          STEP 3
        </div>
        <label class="text-xs text-subtradelabel">
          Insert the transaction ID
        </label>
        <input
          placeholder="Stellar Transaction ID"
          type="text"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="stellarTransaction">
        <div v-if="stellarTransaction.length">
          <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="completeStep3()">
            Next Step
          </button>
          <div v-if="isStep3Completed">
            <div class="mt-8 text-xl font-bold">STEP 4</div>
            <div>
              Check the status of your payment
            </div>
            <button class="p-3 bg-green-400 hover:bg-green-600" @click="checkTransaction()">
              CHECK
            </button>
            <div v-if="isTransactionStatusLoading" class="mt-10 loader"></div>
            <div v-if="transactionStatus == 'OK'" class="px-10 mt-10 bg-green-400">
              SUCCESS
            </div>
            <div v-if="transactionStatus == 'KO'" class="px-10 mt-10 bg-red-400">
              UNSUCCESS
            </div>
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
        numberMonths: 1,
        monthlyDiscount: 2,
        totalToPay: 4.99,
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
      }
    },
    methods: {
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
      completeStep3() {
        this.isStep3Completed = true;
      },
      checkTransaction() {
        this.isTransactionStatusLoading = true;
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/validate_tx/" + this.stellarTransaction,
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
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
