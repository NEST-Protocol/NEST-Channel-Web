import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import Divider from '../Divider'
import { FC, useState } from 'react'

type OptionInput = {
  title: string
  defaultValue: string
  onChange: (value: string) => void
  datalist: item[]
  onCheck: (value: string) => boolean
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
        {props.title}
      </Text>
      <Box
        bg={'white'}
        width={'600px'}
        borderRadius={showOption ? '10px' : '0'}
        border={showOption ? '2px' : '0'}
        borderColor={'primary.500'}
        pos={showOption ? 'absolute' : 'static'}
        zIndex={showOption ? 10 : 0}
      >
        <Input
          variant={showOption ? 'unstyled' : 'filled'}
          placeholder={'Input Price Token Unit'}
          isInvalid={props.onCheck(value)}
          onChange={(event) => {
            setValue(event.target.value)
            props.onChange(event.target.value)
          }}
          value={value}
          onFocus={() => {
            setShowOption(true)
          }}
          onBlur={() => {
            setTimeout(() => setShowOption(false), 200)
          }}
        />

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
                  setValue(item.data)
                  props.onChange(item.data)
                  setShowOption(false)
                }}
                _hover={{ bg: 'secondary.400' }}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default InputWithSelect
