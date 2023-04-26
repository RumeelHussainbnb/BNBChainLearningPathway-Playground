import type {Dispatch, SetStateAction} from 'react';
import {BlockWithTransactions} from '@ethersproject/abstract-provider';

export enum CHAINS {
  
  BNBCHAIN = 'bnbchain',
 
}

// Protocols Enum -----------------------
export type PROTOCOLS =
  | BNBCHAIN_PROTOCOLS

export enum BNBCHAIN_PROTOCOLS {
  RPC = 'RPC',
  JSON_RPC = 'JSON_RPC',
}

export enum BNBCHAIN_NETWORKS {
  TESTNET = 'BSC-Testnet',
  MAINNET = 'BSC-Mainnet',
}

// -----------------------------
export type NETWORKS =

  | BNBCHAIN_NETWORKS

// -----------------------------
export enum NETWORK {
  TESTNET,
  LOCALNET,
  MAINNET,
  DEVNET,
}

// -----------------------------
export type ChainType = {
  id: CHAINS;
  label: string;
  active: boolean;
  logoUrl: string;
  steps: StepType[];
  protocol: PROTOCOLS;
  network: NETWORKS;
};

export type ChainsType = {
  [key in CHAINS]: ChainType;
};

export type ChainPropT = {
  chain: ChainType;
  markdown: MarkdownForChainIdT;
};

export type StepType = {
  id: PROTOCOL_STEPS_ID;
  title: string;
  skippable?: boolean;
  isOneColumn?: boolean;
};

export enum UserActivity {
  PROTOCOL_CLICKED = 'PROTOCOL_CLICKED',
  TUTORIAL_STEP_VIEWED = 'TUTORIAL_STEP_VIEWED',
  STORAGE_CLEARED = 'STORAGE_CLEARED',
}

export type MarkdownForChainIdT = {
  [key in PROTOCOL_STEPS_ID]: string;
};

// Global State -----------------------------
export type GlobalStateT = {
  currentChainId?: CHAINS;
  protocols: ProtocolsStateT;
};

export type ProtocolsStateT = {
  [Key in CHAINS]: ProtocolStateT;
};

export type ProtocolStateT = {
  id: CHAINS;
  label: string;
  logoUrl: string;
  network: NETWORKS;
  protocol: PROTOCOLS;
  isActive: boolean;
  numberOfSteps: number;
  currentStepId: PROTOCOL_STEPS_ID;
  firstStepId: PROTOCOL_STEPS_ID;
  lastStepId: PROTOCOL_STEPS_ID;
  steps: ProtocolStepsT;
  innerState?: InnerStateT;
};

export type ProtocolStepT = {
  id: PROTOCOL_STEPS_ID;
  title: string;
  isSkippable: boolean;
  isOneColumn: boolean;
  isCompleted: boolean;
  previousStepId: PROTOCOL_STEPS_ID | null;
  nextStepId: PROTOCOL_STEPS_ID | null;
  position: number;
};

export type ProtocolStepsT = {
  [Key in PROTOCOL_STEPS_ID]: ProtocolStepT;
};

export type InnerStateT = {
  [Key in PROTOCOL_INNER_STATES_ID]?: string | null;
};

export type LocalStorageStateT = {
  [Key in CHAINS]: LocalStorageProtocolStateT;
};

export type LocalStorageProtocolStateT = {
  currentStepId: PROTOCOL_STEPS_ID;
  steps: {
    [Key in PROTOCOL_STEPS_ID]: {
      isCompleted: boolean;
    };
  };
  innerState?: InnerStateT;
};

export enum PROTOCOL_INNER_STATES_ID {
  SECRET = 'SECRET',
  PRIVATE_KEY = 'PRIVATE_KEY',
  PUBLIC_KEY = 'PUBLIC_KEY',
  ADDRESS = 'ADDRESS',
  CONTRACT_ID = 'CONTRACT_ID',
  MNEMONIC = 'MNEMONIC',
  ACCOUNT_ID = 'ACCOUNT_ID',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL',
  PROGRAM_ID = 'PROGRAM_ID',
  GREETER = 'GREETER',
  METAMASK_NETWORK_NAME = 'METAMASK_NETWORK_NAME',
  DID = 'DID',
  USER_NAME = 'USER_NAME',
}

export enum PROTOCOL_STEPS_ID {
  PREFACE = 'PREFACE',
  FINAL = 'FINAL',
  QUERY_CHAIN = 'QUERY_CHAIN',
  RESTORE_ACCOUNT = 'RESTORE_ACCOUNT',
  FUND_ACCOUNT = 'FUND_ACCOUNT',
  GET_BALANCE = 'GET_BALANCE',
  TRANSFER_TOKEN = 'TRANSFER_TOKEN',
  PROJECT_SETUP = 'PROJECT_SETUP',
  CHAIN_CONNECTION = 'CHAIN_CONNECTION',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  GET_CONTRACT_VALUE = 'GET_CONTRACT_VALUE',
  SET_CONTRACT_VALUE = 'SET_CONTRACT_VALUE',
}

export type AlertT = 'success' | 'info' | 'warning' | 'error' | undefined;


