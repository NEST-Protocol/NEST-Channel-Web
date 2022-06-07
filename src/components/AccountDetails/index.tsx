import { injected, walletconnect } from '../../connectors'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { Button, Link, Spacer, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import WalletConnectIcon from '../../assets/svg/walletConnectIcon.svg'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { shortenAddress } from '../../utils'
import MetamaskIcon from '../../assets/svg/metamask.svg'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

interface AccountDetailsProps {
  openOptions: () => void
}

const AccountDetails = ({ openOptions }: AccountDetailsProps) => {
  const { chainId, account, connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return <Text fontWeight={'600'}>Connected with {name}</Text>
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={20}>
          <img src={MetamaskIcon} alt={'Metamask logo'} />
        </IconWrapper>
      )
    } else if (connector === walletconnect) {
      return (
        <IconWrapper size={20}>
          <img src={WalletConnectIcon} alt={'WalletConnect logo'} />
        </IconWrapper>
      )
    }
    return null
  }

  return (
    <Stack spacing={'20px'}>
      {formatConnectorName()}
      <Stack direction={'row'} justifyContent={'center'}>
        {getStatusIcon()}
        <Text fontWeight={'600'}>{account && shortenAddress(account)}</Text>
        <Spacer />
        {chainId && account && (
          <Link
            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
            fontWeight={'600'}
            color={'secondary.500'}
          >
            View on Explorer
          </Link>
        )}
      </Stack>
      <Stack direction={'row'} w={'full'}>
        {connector !== injected && (
          <Button
            onClick={() => {
              ;(connector as any).close()
            }}
            isFullWidth
          >
            Disconnect
          </Button>
        )}
        <Button onClick={openOptions} variant={'outline'} isFullWidth>
          Change
        </Button>
      </Stack>
    </Stack>
  )
}

export default AccountDetails
