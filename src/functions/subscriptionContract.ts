declare let window: any;
import { ethers } from "ethers";
import SubscriptionInterface from "@/functions/Subscription.json";

const ContractSubscription = () => {
  let provider =  new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(
    "0x42e2EE7Ba8975c473157634Ac2AF4098190fc741",
    SubscriptionInterface.abi,
    provider
  );
};

export default ContractSubscription;
