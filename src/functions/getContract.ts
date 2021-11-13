import { AbiItem } from "web3-utils"
declare let window: any;
import Web3 from "web3"
import {address, ABI} from "@/functions/contractConstants"
let getContract = new Promise(function (resolve, {}) {
  let web3 = new Web3(window.web3.currentProvider);
  let subscriptionContract = new web3.eth.Contract(ABI as AbiItem[], address);
  resolve(subscriptionContract);
})
export default getContract
