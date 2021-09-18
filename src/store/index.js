import { createStore } from "vuex";
import loginStore from "./loginStore"
import tradesStore from "./tradesStore"
import axios from "axios";


export default createStore({
  modules: {
    loginModule: loginStore,
    tradesModule: tradesStore
  }
})
