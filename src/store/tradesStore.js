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
    getTrades ({commit, dispatch}, isopen) {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: import.meta.env.VITE_ROOT_API + "/select_trades/" + isopen
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
    updateTrade({commit, dispatch}, trade) {
      dispatch("calculateTotalReturn");
      dispatch("calculateTotalRoi");
      // For numerical inputs, if value is empty, set it as 0
      for (var i in trade.Subtrades) {
        for (var q in trade.Subtrades[i]) {
          if (["Quantity", "AvgPrice", "Total"].includes(q)) {
            if (trade.Subtrades[i][q] == "") {
              trade.Subtrades[i][q] = 0;
            }
          }
          if (["Timestamp"].includes(q)) {
            if (trade.Subtrades[i][q] == "") {
              var now_timestamp = new Date();
              trade.Subtrades[i][q] = now_timestamp;
            }
          }
        }
      }
      axios({
        method: "POST",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: import.meta.env.VITE_ROOT_API + "/update_trade",
        data: trade
      }).then(response => {
        if (response.status === 200) {
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
    },
    deleteTrade({commit, dispatch}, tradeid) {
      var answer = window.confirm("Are you sure deleting this trade?");
      if (answer) {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/delete_trade/" + tradeid,
        }).then(response => {
          if (response.status === 200) {
            dispatch("getTrades", true);
            dispatch("getTrades", false);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    insertSubtrade({commit, getters}, params) {
      if (params.isopen) {
        var tempTrades = getters.openedTrades;
      } else {
        var tempTrades = getters.closedTrades;
      }
      var next = 1;
      for (var i in tempTrades[params.tradeid].Subtrades) {
        if (tempTrades[params.tradeid].Subtrades[i].SubtradeId >= next) {
          next = next + 1
        }
      }
      var now = new Date();
      var customNow = now.getFullYear() + "-" + 
        ('0' + (now.getMonth()+1)).slice(-2)  + "-" + 
        ('0' + now.getDate()).slice(-2) + "T" + 
        ('0' + (now.getHours())).slice(-2)  + ":" + 
        ('0' + (now.getMinutes())).slice(-2);
      tempTrades[params.tradeid].Subtrades.splice(params.subtradeid + 1, 0, {
        SubtradeId: next,
        Timestamp: customNow,
        Type: null,
        Quantity: 0,
        AvgPrice: 0,
        Total: 0
      });
      if (params.isopen) {
        commit("SET_OpenedTrades", tempTrades);
      } else {
        commit("SET_ClosedTrades", tempTrades);
      }
    },
    removeSubtrade({commit, getters, dispatch}, params) {
      if (params.isopen) {
        var tempTrades = getters.openedTrades;
      } else {
        var tempTrades = getters.closedTrades;
      }
      var answer = window.confirm("Are you sure deleting this subtrade?");
      if (answer) {
        tempTrades[params.tradeid].Subtrades.splice(params.subtradeid, 1);
      }
      if (tempTrades[params.tradeid].Subtrades.length == 0) {
        dispatch("insertSubtrade", {
          "isopen": true, 
          "tradeid": params.tradeid
        });
      }
      dispatch("updateTrade", tempTrades[params.tradeid]);
    }
  }
}
