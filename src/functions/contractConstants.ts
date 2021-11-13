import subscriptionBuild from '@/functions/Subscription.json'

const address: string = subscriptionBuild.networks["1281"].address;
const ABI: object = subscriptionBuild.abi;

export {address, ABI}
