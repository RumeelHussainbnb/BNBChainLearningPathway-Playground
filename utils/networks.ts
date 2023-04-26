import {
  NETWORK,
  CHAINS,
  BNBCHAIN_NETWORKS,
} from 'types';

export const networksMap = (
  network: NETWORK,
  chain: CHAINS,
): string | undefined => {
  
  // BNBCHAIN NETWORKS MAP
  if (chain === CHAINS.BNBCHAIN) {
    if (network === NETWORK.TESTNET) {
      return BNBCHAIN_NETWORKS.TESTNET;
    } else {
      return undefined;
    }
  }

};
