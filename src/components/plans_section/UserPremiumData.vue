<template>
  <div class="my-5">
    <b>{{ userPremiumData.RemainingDays }}</b> remaining days
  </div>
  <div>
    Your payments:
    <table class="mt-2 text-sm">
      <thead class="">
        <tr>
          <th scope="col" class="">
            CreatedAt
          </th>
          <th scope="col" class="">
            Blockchain
          </th>
          <th scope="col" class="">
            Currency
          </th>
          <th scope="col" class="">
            Amount
          </th>
          <th scope="col" class="">
            Months
          </th>
          <th scope="col" class="">
            Transaction
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(payment, i) in userPremiumData.Payments" :key="payment.CreatedAt" class=""> 
          <td class="">
            {{ payment.CreatedAt }}
          </td>
          <td class="">
            {{ payment.Blockchain }}
          </td>
          <td class="">
            {{ payment.Currency }}
          </td>
          <td class="">
            {{ payment.Amount }}
          </td>
          <td class="">
            {{ payment.Months }}
          </td>
          <td class="">
            {{ payment.TransactionId }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    computed: {
      ...mapState("settingsModule", ["userPremiumData"])
    }
  }
</script>
