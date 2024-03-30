import { Reducers, STF } from "@stackr/sdk/machine";
import { ERC20 } from "./state";

// --------- Utilities ---------

type CreateInput = {
  address: string;
};

type BaseActionInput = {
  encryptedState: string;
};

const transfer: STF<ERC20, BaseActionInput> = {
  handler: ({ inputs, state }) => {
    const { encryptedState } = inputs;    
    return encryptedState;
  },
};


export const reducers: Reducers<ERC20> = {
  transfer
};
