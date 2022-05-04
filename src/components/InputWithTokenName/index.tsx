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
import { quotationTokenListAtom } from '../../state/Create/form'
import { useRecoilState } from 'recoil'
import Delete from '../../assets/svg/delete.svg'

type InputWithTokenNameProps = {
  address?: string
  isReadOnly?: boolean
}

const InputWithTokenName: FC<InputWithTokenNameProps> = ({ ...props }) => {
  const [address, setAddress] = useState(props.address || '')
  const [quotationTokenList, setQuotationTokenList] = useRecoilState(quotationTokenListAtom)
  const [valid, setValid] = useState(true)
  const deleteItem = () => {
    const filtered = quotationTokenList.filter((address) => address !== props.address)
    setQuotationTokenList(filtered)
  }
  const toast = useToast()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack direction={'row'} spacing={0}>
      <FormControl w={isLargerThan1024 ? 600 : 'full'} ml={isLargerThan1024 ? 100 : 0} isReadOnly={props.isReadOnly}>
        <InputGroup>
          <Input
            variant={'filled'}
            pr={props.isReadOnly ? '80px' : ''}
            minH={isLargerThan1024 ? '40px' : '44px'}
            fontSize={address === '' ? '15px' : '17px'}
            placeholder={'Input Token Address'}
            isInvalid={!valid}
            errorBorderColor={'primary.500'}
            onChange={(event) => {
              setAddress(event.target.value)
              if (isAddress(event.target.value)) {
                const searchIndex = quotationTokenList.indexOf(event.target.value)
                if (searchIndex === -1) {
                  setValid(true)
                  setQuotationTokenList([...quotationTokenList, event.target.value])
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
              children={
                <Stack pr={'36px'} >
                  <TokenName address={address} />
                </Stack>
              }
            />
          ) }
        </InputGroup>
      </FormControl>
      {
        props.isReadOnly && (
          <Stack w={isLargerThan1024 ? 100 : 30} justifyContent={'center'} pl={'12px'}>
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
          fontWeight={'semibold'}
        >
          {props.hasParentheses ? `(${symbol})` : symbol}
        </Text>
      )}
    </>
  )
}

export default InputWithTokenName
