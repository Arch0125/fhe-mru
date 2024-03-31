import { Wallet } from "ethers";
import { schemas } from "./src/actions";
import { stackrConfig } from "./stackr.config";

const { domain } = stackrConfig;

type ActionName = keyof typeof schemas;

const walletOne = new Wallet(
  "0x0123456789012345678901234567890123456789012345678901234567890123"
);
const walletTwo = new Wallet(
  "0x0123456789012345678901234567890123456789012345678901234567890124"
);

const getBody = async (actionName: ActionName, wallet: Wallet) => {
  const walletAddress = wallet.address;
  const payload = {
          encryptedState: '1',
        };


  console.log(domain)

  const signature = await wallet.signTypedData(
    domain,
    schemas[actionName].EIP712TypedData.types,
    payload
  );

  const body = JSON.stringify({
    msgSender: walletAddress,
    signature,
    payload,
  });

  return body;
};

const run = async (actionName: ActionName, wallet: Wallet) => {
  const start = Date.now();
  const body = await getBody(actionName, wallet);

  const res = await fetch(`http://localhost:3002/${actionName}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

run("transfer", walletOne);

