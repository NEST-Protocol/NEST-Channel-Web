import {FC, useState} from "react";
import {FormControl, Input, InputGroup, InputRightElement, Spinner, Stack, Text} from "@chakra-ui/react";
import {useToken} from "../../hooks/Tokens";
import {isAddress} from "../../utils";
import {PUSD_ADDRESS} from "../../constants/addresses";
import {PROCESSING} from "../../constants/misc";
import {quotationTokenListAtom} from "../../state/Create/form";
import {useRecoilState} from "recoil";

type InputWithTokenNameProps = {
  address?: string
  index?: number
  isReadOnly?: boolean
}


const InputWithTokenName: FC<InputWithTokenNameProps> = ({...props}) => {
  const [address, setAddress] = useState(props.address || '')
  const [quotationTokenList, setQuotationTokenList] = useRecoilState(quotationTokenListAtom)

  return (
    <Stack direction={"row"} spacing={0}>
      <FormControl
        w={600}
        ml={100}
        isReadOnly={props.isReadOnly}
      >
        <InputGroup>
          <Input
            variant={'filled'}
            fontSize={address === '' ? '15px' : '17px'}
            placeholder={'Input Token Address'}
            errorBorderColor={'primary.500'}
            onChange={(event) => {
              setAddress(event.target.value)
              if (isAddress(event.target.value)){
                const searchIndex = quotationTokenList.indexOf(event.target.value)
                if (searchIndex === -1) {
                  setQuotationTokenList([...quotationTokenList, event.target.value])
                  setAddress('')
                }
              }
            }}
            value={address}
          />
          <InputRightElement
            children={
              <Stack pr={'36px'}>
                <TokenName address={address} />
              </Stack>
            }/>
        </InputGroup>
      </FormControl>
      <Stack w={100}>

      </Stack>
    </Stack>
  )
}

type TokenNameProps = {
  address: string
  color?: string
  hasParentheses?: boolean
}

export const TokenName: FC<TokenNameProps> = ({...props}) => {
  const {symbol, fetchStatus} = useToken(isAddress(props.address) ? String(isAddress(props.address)) : PUSD_ADDRESS[1])
  return (
    <>
      { fetchStatus === PROCESSING ? (
        <Spinner size={"sm"}/>
      ) : (
        <Text color={props.color || 'primary.500'} fontWeight={'600'}>{props.hasParentheses ? `(${symbol})` : symbol }</Text>
      ) }
    </>
  )
}

export default InputWithTokenName