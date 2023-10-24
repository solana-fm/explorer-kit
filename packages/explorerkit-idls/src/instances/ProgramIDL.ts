import { Idl as AnchorIdl } from "@coral-xyz/anchor";
import { Idl as ShankIdl } from "@solanafm/kinobi-lite";
import axios, { AxiosInstance } from "axios";

const API_URL = "https://api.solana.fm/v0/";

export type createProgramIdlInstanceOptions = {
  baseUrl?: string;
  apiKey?: string;
};

export type IdlRepoResponse = {
  status: string;
  message: string;
  result: ProgramResponse;
};

/**
 * Represents the response of a program.
 */
export type ProgramResponse = {
  /**
   * The hash of the program.
   */
  programHash: string;
  /**
   * Information about the Program.
   */
  programInformation: ProgramInformation;
  /**
   * Information about the IDL of the program.
   */
  idlInformation?: IdlInformation;
};

/**
 * Information about a program.
 */
export type ProgramInformation = {
  /**
   * The slot number where the program was deployed.
   */
  slotDeployed?: number;
  /**
   * Whether the program has an IDL.
   */
  hasIdl: boolean;
  /**
   * Whether the program is closed.
   */
  isClosed: boolean;
};

/**
 * Information about the IDL (Interface Definition Language) of a program.
 */
export type IdlInformation = {
  /**
   * The slot number where the IDL was deployed.
   */
  slotDeployed?: number;
  /**
   * The name of the IDL.
   */
  idlName?: string;
  /**
   * The version of the IDL.
   */
  idlVersion?: string;
  /**
   * The type of the IDL.
   */
  idlType?: string;
  /**
   * The URL of the IDL.
   */
  idlUrl?: string;
  /**
   * Whether the IDL has accounts.
   */
  hasAccounts?: boolean;
  /**
   * Whether the IDL has events.
   */
  hasEvents?: boolean;
  /**
   * The IDL object.
   */
  idl?: AnchorIdl | ShankIdl | string;
};

/**
 * Creates an Axios instance to communicate with SolanaFM's IDL repository with the given options.
 * @param options - An object containing optional parameters for the instance.
 * @param options.baseUrl - The base URL for the API. Defaults to SFM's Production URL
 * @param options.apiKey - An optional API key to be used to prevent rate-limiting
 * @returns An Axios instance configured for the Program IDL API.
 */
export const createProgramIdlInstance: (options: createProgramIdlInstanceOptions) => AxiosInstance = (
  options: createProgramIdlInstanceOptions = {
    baseUrl: API_URL,
  }
) => {
  // Ensure instances is created to separate from SolanaFM's BaseKit since it's not publicly exposed yet
  const programIdlInstance = axios.create({
    baseURL: options?.baseUrl ?? API_URL,
    headers: {
      ApiKey: options.apiKey,
    },
  });

  return programIdlInstance;
};
