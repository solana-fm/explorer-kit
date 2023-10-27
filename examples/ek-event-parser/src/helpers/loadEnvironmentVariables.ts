import { config } from "dotenv";

config();

export type Environment = {
  programHash: string;
};

export const getEnvironmentVariables = (): Environment => {
  if (!process.env.PROGRAM_HASH) {
    throw new Error("PROGRAM_HASH environment variable is not set");
  }

  return {
    programHash: process.env.PROGRAM_HASH,
  };
};
