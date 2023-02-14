export const accountExplorer = (network: string) => (address: string) => {
  return `https://testnet.bscscan.com/address/${address}`;
};

export const getBNBChainBlockExplorerURL = (block: number) => {
  return `https://testnet.bscscan.com/block/${block}`;
};

export const getBNBChainTxExplorerURL = (txId: string) => {
  return `https://testnet.bscscan.com/tx/${txId}`;
};

export const getBNBChainTokenExplorerURL = (address: string) => {
  return `https://testnet.bscscan.com/token/${address}`;
};

export const getBNBChainFaucetURL = () => {
  return `https://testnet.bnbchain.org/faucet-smart`;
};
