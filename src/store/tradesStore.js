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
    updateTrade({commit, dispatch}, trade) {
      dispatch("calculateTotalReturn");
      dispatch("calculateTotalRoi");
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
          console.log("Trade Updated");
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
    deleteTrade({commit, dispatch, rootGetters}, tradeid) {
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
            dispatch( "getTrades", {
              isopen: false,
              username: rootGetters['loginModule/username']
            }); 
            dispatch( "getTrades", {
              isopen: true,
              username: rootGetters['loginModule/username']
            }); 
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },
    insertSubtrade({commit, getters}, params) {
      var next = 1;
      for (var i in getters.openedTrades[params.tradeid].Subtrades) {
        if (getters.openedTrades[params.tradeid].Subtrades[i].SubtradeId >= next) {
          next = next + 1
        }
      }
      var now = new Date();
      var customNow = now.getFullYear() + "-" + 
        ('0' + (now.getMonth()+1)).slice(-2)  + "-" + 
        ('0' + now.getDate()).slice(-2) + "T" + 
        ('0' + (now.getHours())).slice(-2)  + ":" + 
        ('0' + (now.getMinutes())).slice(-2);
      getters.openedTrades[params.tradeid].Subtrades.splice(params.subtradeid + 1, 0, {
        SubtradeId: next,
        Timestamp: customNow,
        Type: "BUY",
        Reason: "Insert a reason",
        Quantity: 0.0001,
        AvgPrice: 0.0001,
        Total: 0.0001
      });
    },
    removeSubtrade({commit, getters, dispatch}, params) {
      var answer = window.confirm("Are you sure deleting this subtrade?");
      if (answer) {
        getters.openedTrades[params.tradeid].Subtrades.splice(params.subtradeid, 1);
      }
      if (getters.openedTrades[params.tradeid].Subtrades.length == 0) {
        dispatch("insertSubtrade", {
          "tradeid": params.tradeid,
          "subtradeid": 0
        });
      }
      dispatch("updateTrade", getters.openedTrades[params.tradeid]);
    }
  }
}
