import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
          1287: 'wss://rpc.api.moonbase.moonbeam.network'
      },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true
    }
  }
};

export { providerOptions };
