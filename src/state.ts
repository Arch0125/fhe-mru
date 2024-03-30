import { Keccak256 } from "@stackr/sdk";
import { State } from "@stackr/sdk/machine";
import { BytesLike, ZeroHash, ethers, solidityPackedKeccak256 } from "ethers";
import { MerkleTree } from "merkletreejs";

export type encryptedState = string;

export class ERC20 extends State<encryptedState, Keccak256> {
  constructor(state: encryptedState) {
    super(state);
  }

  wrap(state: encryptedState): Keccak256 {
    const newTree = ethers.keccak256(ethers.toUtf8Bytes(state));
    return newTree;
  }

  clone(): State<encryptedState, Keccak256> {
    return new ERC20(this.unwrap());
  }

  unwrap(): encryptedState {
    return this.wrappedState;
  }

  calculateRoot(): BytesLike {
    return this.wrappedState;
  }
}
