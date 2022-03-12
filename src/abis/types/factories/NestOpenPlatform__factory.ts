/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  NestOpenPlatform,
  NestOpenPlatformInterface,
} from "../NestOpenPlatform";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "Open",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "miner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "scale",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "Post",
    type: "event",
  },
  {
    inputs: [],
    name: "_governance",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "addPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOpener",
        type: "address",
      },
    ],
    name: "changeOpener",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[][]",
        name: "indices",
        type: "uint256[][]",
      },
    ],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "vault",
        type: "uint128",
      },
    ],
    name: "decrease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
    ],
    name: "estimate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "height",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payback",
        type: "address",
      },
    ],
    name: "findPrice",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "height",
        type: "uint256",
      },
    ],
    name: "findPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAccountCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getAccountIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
    ],
    name: "getChannelInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "channelId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "unit",
            type: "uint96",
          },
          {
            internalType: "address",
            name: "reward",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "rewardPerBlock",
            type: "uint96",
          },
          {
            internalType: "uint128",
            name: "vault",
            type: "uint128",
          },
          {
            internalType: "uint96",
            name: "rewards",
            type: "uint96",
          },
          {
            internalType: "uint16",
            name: "postFeeUnit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "count",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "opener",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "genesisBlock",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "singleFee",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "reductionRate",
            type: "uint16",
          },
          {
            components: [
              {
                internalType: "address",
                name: "target",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "sheetCount",
                type: "uint96",
              },
            ],
            internalType: "struct INestBatchMining.PairView[]",
            name: "pairs",
            type: "tuple[]",
          },
        ],
        internalType: "struct INestBatchMining.PriceChannelView",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConfig",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "maxBiteNestedLevel",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "priceEffectSpan",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "pledgeNest",
            type: "uint16",
          },
        ],
        internalType: "struct INestBatchMining.Config",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getMinedBlocks",
    outputs: [
      {
        internalType: "uint256",
        name: "minedBlocks",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalShares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "vault",
        type: "uint128",
      },
    ],
    name: "increase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "indexAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "governance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payback",
        type: "address",
      },
    ],
    name: "lastPriceList",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "lastPriceList",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "lastPriceListAndTriggeredPriceInfo",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "triggeredPriceBlockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "triggeredPriceValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "triggeredAvgPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "triggeredSigmaSQ",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "payback",
        type: "address",
      },
    ],
    name: "lastPriceListAndTriggeredPriceInfo",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "order",
        type: "uint256",
      },
    ],
    name: "list",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "index",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "miner",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "height",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "remainNum",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "ethNumBal",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "tokenNumBal",
            type: "uint32",
          },
          {
            internalType: "uint24",
            name: "nestNum1k",
            type: "uint24",
          },
          {
            internalType: "uint8",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "shares",
            type: "uint8",
          },
          {
            internalType: "uint152",
            name: "price",
            type: "uint152",
          },
        ],
        internalType: "struct INestBatchMining.PriceSheetView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint96",
            name: "rewardPerBlock",
            type: "uint96",
          },
          {
            internalType: "uint16",
            name: "postFeeUnit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "singleFee",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "reductionRate",
            type: "uint16",
          },
        ],
        internalType: "struct INestBatchMining.ChannelConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "modify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "unit",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint96",
            name: "rewardPerBlock",
            type: "uint96",
          },
          {
            internalType: "uint16",
            name: "postFeeUnit",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "singleFee",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "reductionRate",
            type: "uint16",
          },
        ],
        internalType: "struct INestBatchMining.ChannelConfig",
        name: "config",
        type: "tuple",
      },
    ],
    name: "open",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "pay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "scale",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "equivalents",
        type: "uint256[]",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "maxBiteNestedLevel",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "priceEffectSpan",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "pledgeNest",
            type: "uint16",
          },
        ],
        internalType: "struct INestBatchMining.Config",
        name: "config",
        type: "tuple",
      },
    ],
    name: "setConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "takeNum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newEquivalent",
        type: "uint256",
      },
    ],
    name: "take",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
    ],
    name: "totalETHRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "payback",
        type: "address",
      },
    ],
    name: "triggeredPrice",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "triggeredPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pairIndex",
        type: "uint256",
      },
    ],
    name: "triggeredPriceInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "avgPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sigmaSQ",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "channelId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "pairIndices",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "payback",
        type: "address",
      },
    ],
    name: "triggeredPriceInfo",
    outputs: [
      {
        internalType: "uint256[]",
        name: "prices",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class NestOpenPlatform__factory {
  static readonly abi = _abi;
  static createInterface(): NestOpenPlatformInterface {
    return new utils.Interface(_abi) as NestOpenPlatformInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NestOpenPlatform {
    return new Contract(address, _abi, signerOrProvider) as NestOpenPlatform;
  }
}
