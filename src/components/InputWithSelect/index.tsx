import { Box, Button, FormControl, Input, NumberInput, NumberInputField, Stack, Text } from '@chakra-ui/react'
import Divider from '../Divider'
import { FC, useState } from 'react'
import { formatWithUnit, parseToNumber } from '../../utils/unit'

type OptionInput = {
  title: string
  defaultValue: string
  onChange: (value: string) => void
  datalist: item[]
  onCheck: (value: string) => boolean
  unit?: string
  isNumber?: boolean
  max?: number
  min?: number
}

type item = {
  title: string
  data: string
}

const InputWithSelect: FC<OptionInput> = ({ ...props }) => {
  const [showOption, setShowOption] = useState(false)
  const [value, setValue] = useState(props.defaultValue)

  return (
    <Box pb={showOption ? '40px' : '0'}>
      <Text fontWeight={'600'} mb={'16px'} mx={'16px'}>
        {props.title}:
      </Text>
      <FormControl
        bg={'white'}
        width={'600px'}
        borderRadius={showOption ? '10px' : '0'}
        border={showOption ? '2px' : '0'}
        borderColor={'primary.500'}
        pos={showOption ? 'absolute' : 'static'}
        zIndex={showOption ? 10 : 0}
      >
        {props.isNumber ? (
          <NumberInput
            variant={showOption ? 'unstyled' : 'filled'}
            placeholder={'Input Price Token Unit'}
            isInvalid={props.onCheck(value)}
            onChange={(valueString) => {
              setValue(parseToNumber(valueString, props.unit))
              props.onChange(parseToNumber(valueString, props.unit))
            }}
            value={formatWithUnit(value, props.unit)}
            max={props.max}
            min={props.min}
            onFocus={(e) => {
              e.target.setSelectionRange(0, value.length)
              setShowOption(true)
            }}
            onBlur={() => {
              setTimeout(() => setShowOption(false), 200)
            }}
          >
            <NumberInputField />
          </NumberInput>
        ) : (
          <Input
            id={'amount'}
            variant={showOption ? 'unstyled' : 'filled'}
            placeholder={'Input Price Token Unit'}
            isInvalid={props.onCheck(value)}
            onChange={(event) => {
              setValue(parseToNumber(event.target.value, props.unit))
              props.onChange(parseToNumber(event.target.value, props.unit))
            }}
            value={formatWithUnit(value, props.unit)}
            onFocus={(e) => {
              e.target.setSelectionRange(0, value.length)
              setShowOption(true)
            }}
            onBlur={() => {
              setTimeout(() => setShowOption(false), 200)
            }}
          />
        )}

        {props.datalist.length > 0 && (
          <Stack hidden={!showOption} pb={1} top={'72px'} spacing={0}>
            <Divider />
            {props.datalist.map((item) => (
              <Button
                variant={'ghost'}
                justifyContent={'flex-start'}
                fontWeight={'500'}
                borderRadius={0}
                key={item.title}
                onClick={() => {
                  setValue(parseToNumber(item.data, props.unit))
                  props.onChange(parseToNumber(item.data, props.unit))
                  setShowOption(false)
                }}
                _hover={{ bg: 'secondary.400' }}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
        )}
      </FormControl>
    </Box>
  )
}

export default InputWithSelect
