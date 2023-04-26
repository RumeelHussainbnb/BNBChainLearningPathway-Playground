import {
  NETWORKS,
  PROTOCOLS,
  CHAINS,

} from 'types';

export const getNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
  node?: string,
): string => {
  if (node === 'devnet') {
    return getTestnetNodeURL(chain);
  }
  if (node === 'localnet') {
    return getLocalNodeURL(chain);
  }
  return getExternalNodeURL(chain, network, protocol);
};

const getTestnetNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.BNBCHAIN:
      return 'https://data-seed-prebsc-1-s1.binance.org:8545';
    default:
      return '';
  }
};

const getLocalNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.BNBCHAIN:
      return 'http://127.0.0.1:8545';
    default:
      return '';
  }
};

export const getExternalNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
): string => {
  switch (chain) {
    case CHAINS.BNBCHAIN:
      return getExternalBNBChainNodeUrl();
    default:
      return '';
  }
};

const getExternalBNBChainNodeUrl = (): string =>
  `${process.env.BNBCHAIN_TESTNET_URL}`;

