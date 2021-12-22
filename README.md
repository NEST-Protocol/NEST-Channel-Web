# Nest Channel Web

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![ipfs-publish](https://github.com/NEST-Protocol/NEST-Channel-Web/actions/workflows/main.yml/badge.svg)](https://github.com/NEST-Protocol/NEST-Channel-Web/actions/workflows/main.yml)

## Support Chain

- [ ] Ethereum
- [ ] Rinkeby
- [x] Smart Chain
- [x] Smart Chain - Testnet

## Help

### Add Smart Chain to Metamask

Smart Chain

- rpc: https://bsc-dataseed.binance.org/
- chainid: 56
- symbol: BNB
- block explorer URL: https://bscscan.com

Smart Chain - Testnet

- rpc: https://data-seed-prebsc-1-s1.binance.org:8545/
- chainid: 97
- symbol: BNB
- block explorer URL: https://testnet.bscscan.com

### To developer

1. Create environments file.
    ```shell
    cp .env.example .env
    ```
   
2. Take your [REACT_APP_INFURA_KEY](https://infura.io/)、[REACT_APP_ETHERSCAN_KEY](https://etherscan.io/)、[REACT_APP_BSCSCAN_KEY](https://bscscan.com/).

4. Install dependence.
    ```shell
    yarn
    ```

5. Serve the web.
    ```shell
    yarn start
    ```
