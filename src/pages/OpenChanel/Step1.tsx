import {FormControl, FormErrorMessage, FormLabel, Input, Select, Stack} from "@chakra-ui/react";

const Step1 = () => {
  return (
    <Stack pt={"60px"} pb={"30px"} w={"600px"} spacing={"20px"}>
      <FormControl id='quotation token address'>
        <FormLabel>Quotation Token:</FormLabel>
        <Input variant={"filled"} placeholder={"Input Token Address"}/>
        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
      </FormControl>

      <FormControl id='price token'>
        <FormLabel>Price Token:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='mining token'>
        <FormLabel>Mining Token:</FormLabel>
        <Input variant={"filled"} placeholder={"Input Token Address"}/>
        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
      </FormControl>
    </Stack>
  )
}

export default Step1