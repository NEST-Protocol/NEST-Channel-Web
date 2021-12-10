import {Stack} from "@chakra-ui/react";
import * as React from "react";

const Background = () => {
  return (
    <Stack bg={"gray"} w={"full"} h={"full"} pos={"fixed"} zIndex={"-1"} top={0} left={0}>
    </Stack>
  )
}

export default Background