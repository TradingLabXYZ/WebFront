declare let window: any;
import { ethers } from "ethers";
import SubscriptionInterface from "@/functions/SubscriptionModel.json";
const contract_address = SubscriptionInterface.networks[process.env.VUE_APP_MOONBEAM_CHAINID || ''].address;
const ContractSubscription = () => {
  let provider =  new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    contract_address,
    SubscriptionInterface.abi,
    provider
  );
};

export default ContractSubscription;
