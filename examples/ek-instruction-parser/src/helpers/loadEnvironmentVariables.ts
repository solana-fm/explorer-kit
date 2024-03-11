import { config } from "dotenv";

config();

export type Environment = {
  programHash: string;
  transactionHash: string;
  rpc_url: string;
};

export const getEnvironmentVariables = (): Environment => {
  if (!process.env.PROGRAM_HASH) {
    throw new Error("PROGRAM_HASH environment variable is not defined");
  }
  if (!process.env.TRANSACTION_HASH) {
    throw new Error("TRANSACTION_HASH environment variable is not defined");
  }
  if (!process.env.RPC_URL) {
    throw new Error("RPC_URL environment variable is not defined");
  }

  return {
    programHash: process.env.PROGRAM_HASH,
    transactionHash: process.env.TRANSACTION_HASH,
    rpc_url: process.env.RPC_URL,
  };
};
