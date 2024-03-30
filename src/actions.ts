import { ActionSchema, SolidityType } from "@stackr/sdk";

// utility function to create a transfer schema
function generateSchemaFromBase(name: string) {
  return new ActionSchema(name, {
    encryptedState: SolidityType.STRING,
  });
}

// createAccountSchema is a schema for creating an account
export const createAccountSchema = new ActionSchema("createAccount", {
  address: SolidityType.ADDRESS,
});

// transferSchema is a collection of all the transfer actions
// that can be performed on the rollup
export const schemas = {
  transfer: generateSchemaFromBase("transfer"),
};
