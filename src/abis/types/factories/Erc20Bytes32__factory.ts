/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { Erc20Bytes32, Erc20Bytes32Interface } from '../Erc20Bytes32'

const _abi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export class Erc20Bytes32__factory {
  static readonly abi = _abi
  static createInterface(): Erc20Bytes32Interface {
    return new utils.Interface(_abi) as Erc20Bytes32Interface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Erc20Bytes32 {
    return new Contract(address, _abi, signerOrProvider) as Erc20Bytes32
  }
}
