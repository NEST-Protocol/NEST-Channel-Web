import { FC } from 'react'
import NEST from '../../assets/svg/NEST.svg'
import PETH from '../../assets/svg/PETH.svg'
import PBTC from '../../assets/svg/PBTC.svg'
import PUSD from '../../assets/svg/PUSD.svg'
import ETH from '../../assets/svg/ETH.svg'
import {useToken} from "../../hooks/Tokens";
import {chakra} from "@chakra-ui/react";

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
    return <chakra.img src={NEST} alt={''} h={props.size ?? '20px'} w={props.size ?? '20px'} />
  } else if (symbol === 'PETH') {
    return <chakra.img src={PETH} alt={''} h={props.size ?? '20px'} w={props.size ?? '20px'} />
  } else if (symbol === 'PBTC') {
    return <chakra.img src={PBTC} alt={''} h={props.size ?? '20px'} w={props.size ?? '20px'} />
  } else if (symbol === 'PUSD') {
    return <chakra.img src={PUSD} alt={''} h={props.size ?? '20px'} w={props.size ?? '20px'} />
  } else if (symbol === 'ETH') {
    return <chakra.img src={ETH} alt={''} height={props.size ?? '20px'} w={props.size ?? '20px'} />
  }

  return <chakra.img src={`/tokens/${symbol}.png`} h={props.size ?? '20px'} alt={""}/>
}

export default TokenIcon
