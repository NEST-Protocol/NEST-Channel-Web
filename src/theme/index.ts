import {extendTheme} from "@chakra-ui/react"
import {config} from "./config"
import {borders} from "./foundations/borders"
import {Button} from "./components/button"
import {Text} from "./components/text"
import {Heading} from "./components/heading"
import {colors} from "./foundations/colors"
import {Input} from "./components/input"
import {Select} from "./components/select";
import {Steps} from "./components/steps";

const theme = extendTheme({
  colors,
  config,
  borders,
  components: {
    Steps,
    Select,
    Button,
    Text,
    Heading,
    Input
  },
})

export default theme
