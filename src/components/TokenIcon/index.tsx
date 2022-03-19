import { FC } from 'react'
import NEST from '../../assets/svg/NEST.svg'
import PETH from '../../assets/svg/PETH.svg'
import PBTC from '../../assets/svg/PBTC.svg'
import PUSD from '../../assets/svg/PUSD.svg'
import ETH from '../../assets/svg/ETH.svg'
import HBTC from '../../assets/svg/HBTC.svg'

type TokenIconProps = {
  symbol: string
}

const TokenIcon: FC<TokenIconProps> = ({ ...props }) => {
  switch (props.symbol) {
    case 'NEST':
      return <img src={NEST} alt={'NEST'} height={'20px'} width={'20px'} />
    case 'PETH':
      return <img src={PETH} alt={'PETH'} height={'20px'} width={'20px'} />
    case 'PBTC':
      return <img src={PBTC} alt={'PBTC'} height={'20px'} width={'20px'} />
    case 'PUSD':
      return <img src={PUSD} alt={'PUSD'} height={'20px'} width={'20px'} />
    case 'ETH':
      return <img src={ETH} alt={'ETH'} height={'20px'} width={'20px'} />
    case 'HBTC':
      return <img src={HBTC} alt={'HBTC'} height={'20px'} width={'20px'} />

    default:
      return <></>
  }
}

export default TokenIcon
