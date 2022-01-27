import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletconnect = new WalletConnectConnector({
  rpc: {
      1287: 'https://rpc.api.moonbase.moonbeam.network'
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})
