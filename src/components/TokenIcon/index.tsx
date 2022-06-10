import { FC } from 'react'
import NEST from '../../assets/svg/NEST.svg'
import PETH from '../../assets/svg/PETH.svg'
import PBTC from '../../assets/svg/PBTC.svg'
import PUSD from '../../assets/svg/PUSD.svg'
import {useToken} from "../../hooks/Tokens";

type TokenIconProps = {
  address: string
  size?: string
}

const TokenIcon: FC<TokenIconProps> = ({ ...props }) => {
  const { symbol } = useToken(props.address)

  if (symbol === '' || symbol === 'Error') {
    return <></>
  }

  if (symbol === 'NEST') {
    return <img src={NEST} alt={''} height={props.size ?? '20px'} width={props.size ?? '20px'} />
  } else if (symbol === 'PETH') {
    return <img src={PETH} alt={''} height={props.size ?? '20px'} width={props.size ?? '20px'} />
  } else if (symbol === 'PBTC') {
    return <img src={PBTC} alt={''} height={props.size ?? '20px'} width={props.size ?? '20px'} />
  } else if (symbol === 'PUSD') {
    return <img src={PUSD} alt={''} height={props.size ?? '20px'} width={props.size ?? '20px'} />
  }

  return <img src={`/tokens/${symbol}.png`} height={props.size ?? '20px'} width={props.size ?? '20px'} alt={""}/>
}

export default TokenIcon
