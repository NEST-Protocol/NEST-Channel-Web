import { extendTheme } from '@chakra-ui/react'
import { config } from './config'
import { borders } from './foundations/borders'
import { Button } from './components/button'
import { Text } from './components/text'
import { Heading } from './components/heading'
import { colors } from './foundations/colors'
import { Input } from './components/input'
import { Select } from './components/select'
import { NumberInput } from './components/numberInput'
import {styles} from "./styles";

const theme = extendTheme({
  colors,
  config,
  borders,
  styles,
  components: {
    Select,
    Button,
    Text,
    Heading,
    NumberInput,
    Input,
  },
})

export default theme
