import {FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Text} from "@chakra-ui/react";

const Step1 = () => {
  return (
    <Stack pt={"60px"} pb={"30px"} w={"600px"} spacing={"20px"}>
      <FormControl id='quotation token address'>
        <FormLabel fontWeight={"600"}>Quotation Token:</FormLabel>
        <Input variant={"filled"} placeholder={"Input Token Address"}/>
        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
      </FormControl>

      <FormControl id='price token'>
        <FormLabel fontWeight={"600"}>Price Token:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='mining token'>
        <FormLabel fontWeight={"600"}>Mining Token:</FormLabel>
        <Input variant={"filled"} placeholder={"Input Token Address"}/>
        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
      </FormControl>
    </Stack>
  )
}

export const Tip1 = () => {
  return (
    <Stack w={"764px"} spacing={"12px"}>
      <Text fontWeight={"bold"}>Instructions</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Price Token Address</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>The quoted pair...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Quotation Token Address</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>The address of the ...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Quotation Token Address</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>Set the ...</Text>
    </Stack>
  )
}

export default Step1