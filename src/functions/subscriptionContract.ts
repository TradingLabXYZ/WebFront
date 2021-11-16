declare let window: any;
import { ethers } from "ethers";
import SubscriptionInterface from "@/functions/Subscription.json";

const ContractSubscription = () => {
  let provider =  new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    "0xF9dAdE404348C6fE0342b2a64C80ca4F0425d90A",
    SubscriptionInterface.abi,
    provider
  );
};

export default ContractSubscription;
