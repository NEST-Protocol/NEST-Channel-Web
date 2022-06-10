import { FC, useState } from 'react'
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text, useMediaQuery,
  useToast,
} from '@chakra-ui/react'
import { useToken } from '../../hooks/Tokens'
import {isAddress} from '../../utils'
import { PUSD_ADDRESS } from '../../constants/addresses'
import { PROCESSING } from '../../constants/misc'
import Delete from '../../assets/svg/delete.svg'
import TokenIcon from "../TokenIcon";

type InputWithTokenNameProps = {
  address?: string
  isReadOnly?: boolean
  tokenList: string[]
  setTokenList: (list: string[]) => void
}

const InputWithTokenName: FC<InputWithTokenNameProps> = ({ ...props }) => {
  const [address, setAddress] = useState(props.address || '')
  const [valid, setValid] = useState(true)
  const deleteItem = () => {
    const filtered = props.tokenList.filter((address) => address !== props.address)
    props.setTokenList(filtered)
  }
  const toast = useToast()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack direction={'row'} spacing={0}>
      { props.isReadOnly && (
        <Stack w={isLargerThan1024 ? 100 : 30}/>
      ) }
      <FormControl w={isLargerThan1024 ? 600 : 'full'} isReadOnly={props.isReadOnly}>
        <InputGroup>
          <Input
            variant={'filled'}
            pr={props.isReadOnly ? '80px' : ''}
            minH={isLargerThan1024 ? '40px' : '44px'}
            fontSize={address === '' ? 'sm' : 'md'}
            fontWeight={'bold'}
            placeholder={'Input Token Address'}
            isInvalid={!valid}
            errorBorderColor={'primary.500'}
            onChange={(event) => {
              setAddress(event.target.value)
              if (isAddress(event.target.value)) {
                const searchIndex = props.tokenList.indexOf(event.target.value)
                if (searchIndex === -1) {
                  setValid(true)
                  props.setTokenList([...props.tokenList, event.target.value])
                  setAddress('')
                } else {
                  setValid(false)
                  toast({
                    position: 'top',
                    render: () => (
                      <Box
                        color="white"
                        p={3}
                        px={6}
                        bg="primary.500"
                        textAlign={'center'}
                        fontWeight={'bold'}
                        borderRadius={'full'}
                      >
                        Duplicate Token Address!
                      </Box>
                    ),
                  })
                }
              } else if (event.target.value === '') {
                setValid(true)
              } else {
                setValid(false)
              }
            }}
            value={address}
          />
          { props.isReadOnly && (
            <InputRightElement
              h={'full'}
              pr={'16px'}
              children={
                <TokenIcon address={address}/>
              }
            />
          ) }
        </InputGroup>
      </FormControl>
      {
        props.isReadOnly && (
          <Stack w={isLargerThan1024 ? 100 : 30} justifyContent={'center'} pl={'12px'} cursor={"pointer"}>
            <img src={Delete} alt={'delete'} width={'20px'} height={'20px'} onClick={deleteItem} />
          </Stack>
        )
      }
    </Stack>
  )
}

type TokenNameProps = {
  address: string
  color?: string
  fontSize?: string
  fontWeight?: string
  hasParentheses?: boolean
}

export const TokenName: FC<TokenNameProps> = ({ ...props }) => {
  const { symbol, fetchStatus } = useToken(
    isAddress(props.address) ? String(isAddress(props.address)) : PUSD_ADDRESS[1]
  )
  return (
    <>
      {fetchStatus === PROCESSING ? (
        <Spinner size={'sm'} />
      ) : (
        <Text
          color={symbol === 'Error' ? 'red' : props.color || 'primary.500'}
          fontSize={props.fontSize ?? 'md'}
          fontWeight={props.fontWeight ?? 'semibold'}
        >
          {isAddress(props.address) ? (props.hasParentheses ? `(${symbol})` : symbol) : ''}
        </Text>
      )}
    </>
  )
}

export default InputWithTokenName
