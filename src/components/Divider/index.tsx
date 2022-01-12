import { Stack } from '@chakra-ui/react'
import { FC } from 'react'

type DividerProps = {
  active?: boolean
  dashed?: boolean
}

const Divider: FC<DividerProps> = ({ ...props }) => {
  return (
    <Stack
      w={'full'}
      borderBottom={'1px'}
      borderStyle={props.dashed ? 'dashed' : 'solid'}
      borderColor={props.active ? 'primary.500' : 'secondary.400'}
    />
  )
}

export default Divider
