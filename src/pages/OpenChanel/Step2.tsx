import {FormControl, FormLabel, Select, Stack, Text} from "@chakra-ui/react";
import {ImCircleDown} from "react-icons/all";

const Step2 = () => {
  return (
    <Stack pt={"60px"} pb={"30px"} w={"600px"} spacing={"20px"}>
      <FormControl id='price token uint'>
        <FormLabel fontWeight={"600"}>Price Token Unit:</FormLabel>
        <Select placeholder='Select price token' variant={"filled"} icon={<ImCircleDown/>} iconColor={"secondary"}>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='standard output'>
        <FormLabel fontWeight={"600"}>Standard Output:</FormLabel>
        <Select placeholder='Select price token' variant={"filled"} icon={<ImCircleDown/>} iconColor={"secondary"}>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='quotation fee'>
        <FormLabel fontWeight={"600"}>Quotation Fee:</FormLabel>
        <Select placeholder='Select price token' variant={"filled"} icon={<ImCircleDown/>} iconColor={"secondary"}>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='price calling fee'>
        <FormLabel fontWeight={"600"}>Price Calling Fee:</FormLabel>
        <Select placeholder='Select price token' variant={"filled"} icon={<ImCircleDown/>} iconColor={"secondary"}>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>

      <FormControl id='attenuation factor'>
        <FormLabel fontWeight={"600"}>Attenuation Factor:</FormLabel>
        <Select placeholder='Select price token' variant={"filled"} icon={<ImCircleDown/>} iconColor={"secondary"}>
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
      <Text fontSize={"sm"} fontWeight={"600"}>Price Token Uint</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>The quoted pair...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Standard Output</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>The address of the ...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Quotation Fee</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>Set the ...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Price Calling Fee</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>Set the ...</Text>
      <p/>
      <Text fontSize={"sm"} fontWeight={"600"}>Attenuation Factor</Text>
      <Text fontSize={"sm"} color={"secondary"} fontWeight={"600"}>Set the ...</Text>
    </Stack>
  )
}

export default Step2