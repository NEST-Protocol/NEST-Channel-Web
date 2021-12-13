import { Stack } from '@chakra-ui/react'
import { FC } from 'react'

type DividerProps = {
  active?: boolean
}

const Divider: FC<DividerProps> = ({ ...props }) => {
  return <Stack w={'full'} h={'1px'} bg={props.active ? 'primary.500' : 'secondary.400'} />
}

export default Divider
