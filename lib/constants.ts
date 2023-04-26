import {
  ChainsType,
  CHAINS,
  PROTOCOL_STEPS_ID,
  BNBCHAIN_PROTOCOLS,
  BNBCHAIN_NETWORKS,
} from 'types';

export const GRID_LAYOUT = [13, 11];
export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 90;

export const CHAINS_CONFIG: ChainsType = {
  [CHAINS.BNBCHAIN]: {
    id: CHAINS.BNBCHAIN,
    label: 'BNBChain',
    active: true,
    logoUrl:
      'https://d257b89266utxb.cloudfront.net/galaxy/images/logo/bsc-logo.png',
    protocol: BNBCHAIN_PROTOCOLS.RPC,
    network: BNBCHAIN_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PREFACE,
        title: 'Welcome to the BNB Chain Pathway',
        isOneColumn: true,
      },
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        isOneColumn: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to BNB Smart Chain',
      },
      {
        id: PROTOCOL_STEPS_ID.QUERY_CHAIN,
        title: 'Query BNB Smart Chain',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Fund a BNB Smart Chain account',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some BNB',
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a Solidity Smart Contract',
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of the contract',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of the contract',
      },
      /*{
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore your account',
      },*/
      {
        id: PROTOCOL_STEPS_ID.FINAL,
        title: '🎓 Pathway complete!',
        isOneColumn: true,
      },
    ],
  },
};
