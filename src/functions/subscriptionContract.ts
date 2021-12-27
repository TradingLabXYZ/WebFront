declare let window: any;
import { ethers } from "ethers";
import SubscriptionInterface from "@/functions/Subscription.json";

const contract_address = SubscriptionInterface.networks[process.env.VUE_APP_MOONBEAM_CHAINID || ''].address;

console.log("subscription contract", contract_address)

const ContractSubscription = () => {
  let provider =  new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    contract_address,
    SubscriptionInterface.abi,
    provider
  );
};

export default ContractSubscription;
