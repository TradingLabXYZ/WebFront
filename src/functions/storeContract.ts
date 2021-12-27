declare let window: any;
import { ethers } from "ethers";
import StoreInterface from "@/functions/Store.json";

const contract_address = StoreInterface.networks[process.env.VUE_APP_MOONBEAM_CHAINID || ''].address;

console.log("store contract", contract_address)

const ContractStore = () => {
  let provider =  new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    contract_address,
    StoreInterface.abi,
    provider
  );
};

export default ContractStore;
