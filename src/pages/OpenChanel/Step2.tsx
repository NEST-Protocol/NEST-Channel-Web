import {FormControl, FormLabel, Select, Stack, Text} from "@chakra-ui/react";

const Step2 = () => {
  return (
    <Stack pt={"60px"} pb={"30px"} w={"600px"} spacing={"20px"}>
      <FormControl id='price token uint'>
        <FormLabel>Price Token Unit:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='standard output'>
        <FormLabel>Standard Output:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='quotation fee'>
        <FormLabel>Quotation Fee:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='price calling fee'>
        <FormLabel>Price Calling Fee:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='attenuation factor'>
        <FormLabel>Attenuation Factor:</FormLabel>
        <Select placeholder='Select price token'>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>
    </Stack>
  );
}

export const Tip2 = () => {
  return (
    <Stack w={"764px"} spacing={"12px"}>
      <Text fontWeight={"bold"}>Instructions</Text>
      <p/>
      <Text fontSize={"sm"}>Price Token Uint</Text>
      <Text fontSize={"sm"} color={"secondary"}>The quoted pair...</Text>
      <p/>
      <Text fontSize={"sm"}>Standard Output</Text>
      <Text fontSize={"sm"} color={"secondary"}>The address of the ...</Text>
      <p/>
      <Text fontSize={"sm"}>Quotation Fee</Text>
      <Text fontSize={"sm"} color={"secondary"}>Set the ...</Text>
      <p/>
      <Text fontSize={"sm"}>Price Calling Fee</Text>
      <Text fontSize={"sm"} color={"secondary"}>Set the ...</Text>
      <p/>
      <Text fontSize={"sm"}>Attenuation Factor</Text>
      <Text fontSize={"sm"} color={"secondary"}>Set the ...</Text>
    </Stack>
  )
}

export default Step2