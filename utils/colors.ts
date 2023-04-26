import {CHAINS} from 'types';

export const colors = {
  bnbYellow: '#F0B90B',
  darkBackground: 'rgb(33, 37, 41)',
};

type ChainColorsType = {
  primaryColor: string;
  secondaryColor: string;
};

export const getChainColors = (chainId: CHAINS): ChainColorsType => {
  return {
    primaryColor: getPrimaryColor(chainId),
    secondaryColor: getSecondaryColor(chainId),
  };
};

const getPrimaryColor = (chainId: CHAINS) => {
  if (chainId === CHAINS.BNBCHAIN) {
    return '#F0B90B';
  }
  return 'rgb(255, 242, 155)';
};

const getSecondaryColor = (chainId: CHAINS) => {
  if (chainId === CHAINS.BNBCHAIN) {
    return '#0B0E116';
  } 
  return 'black';
};
