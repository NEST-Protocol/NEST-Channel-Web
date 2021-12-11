import {Stack, Text} from "@chakra-ui/react";
import LineChart from "../../components/LineChart";

const QuotationFrequency = () => {
  return (
    <Stack bg={"white"} w={"full"} h={"460px"} borderRadius={"20px"} p={"20px"}>
      <Text fontWeight={"bold"}>Quotation Frequency</Text>
      <Stack p={"20px"} h={"full"} w={"full"}>
        <LineChart />
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency