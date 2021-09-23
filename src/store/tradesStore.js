import axios from "axios"
import getTradeStats from "../functions/getTradeStats.js";

export default {
  namespaced: true,
  state: {
    userPreferences: {
      returnCurrency: 'USD'
    },
    openedTrades: {},
    closedTrades: {},
    totalReturn: 0,
    totalRoi: 0
  },
  getters: {
    userPreferences: state => {
      return state.userPreferences;
    },
    openedTrades: state => {
      return state.openedTrades;
    },
    closedTrades: state => {
      return state.closedTrades;
    },
    totalReturn: state => {
      return state.totalReturn;
    },
    totalRoi: state => {
      return state.totalRoi;
    }
  },
  mutations: {
    SET_OpenedTrades(state, openedTrades) {
      state.openedTrades = openedTrades;
    },
    SET_ClosedTrades(state, closedTrades) {
      state.closedTrades = closedTrades;
    },
    SET_TotalReturn(state, totalReturn) {
      state.totalReturn = totalReturn;
    },
    SET_TotalRoi(state, totalRoi) {
      state.totalRoi = totalRoi;
    }    
  },
  actions: {
    getTrades ({commit, dispatch}, params) {
      var isopen = params.isopen;
      var username = params.username;
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: import.meta.env.VITE_ROOT_API + "/select_trades/" + username + "/" + isopen
      }).then(response => {
        if (response.status === 200) {
          if (isopen) {
            commit("SET_OpenedTrades", response.data);
          }
          else {
            commit("SET_ClosedTrades", response.data);
          }
          dispatch("calculateTotalReturn");
          dispatch("calculateTotalRoi");
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    calculateTotalReturn({commit, getters}) {
      var tempTotalReturn = 0;
      var tempTotalTrades = [getters.openedTrades, getters.closedTrades];
      for (var x in tempTotalTrades) {
        var tempTrades = tempTotalTrades[x];
        for (var i in tempTrades) {
          var tradeReturn = 0;
          if (getters.userPreferences.returnCurrency == 'BTC') {
            tradeReturn = getTradeStats(tempTrades[i]).TotalReturnBtc;
          } else {
            tradeReturn = getTradeStats(tempTrades[i]).TotalReturnUsd;
          }
          tempTotalReturn = tempTotalReturn + tradeReturn;
        }
      }
      commit("SET_TotalReturn", tempTotalReturn);
    },
    calculateTotalRoi({commit, getters}) {
      var tempTotalFutureReturn = 0;
      var tempTotalSells = 0;
      var tempTotalBuys = 0;
      var tempTotalTrades = [getters.openedTrades, getters.closedTrades];
      for (var x in tempTotalTrades) {
        var tempTrades = tempTotalTrades[x];
        for (var i in tempTrades) {
          var tradeFutureReturn = 0;
          var tradeTotalSells = 0;
          var tradeTotalBuys = 0;
          if (getters.userPreferences.returnCurrency == 'BTC') {
            tradeFutureReturn = getTradeStats(tempTrades[i]).FutureReturnBtc;
            tradeTotalSells = getTradeStats(tempTrades[i]).TotalSellsBtc;
            tradeTotalBuys = getTradeStats(tempTrades[i]).TotalBuysBtc;
          } else {
            tradeFutureReturn = getTradeStats(tempTrades[i]).FutureReturnUsd;
            tradeTotalSells = getTradeStats(tempTrades[i]).TotalSellsUsd;
            tradeTotalBuys = getTradeStats(tempTrades[i]).TotalBuysUsd;
          }
          tempTotalFutureReturn = tempTotalFutureReturn + tradeFutureReturn;
          tempTotalSells = tempTotalSells + tradeTotalSells;
          tempTotalBuys = tempTotalBuys + tradeTotalBuys;
        }
      }
      var totalRoi = ((tempTotalFutureReturn + tempTotalSells) / tempTotalBuys - 1) * 100;
      commit("SET_TotalRoi", totalRoi);
    }
  }
}
