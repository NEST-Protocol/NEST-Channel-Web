import {Stack, Text} from "@chakra-ui/react";
import LineChart from "../../components/LineChart";

const QuotationFrequency = () => {
  return (
    <Stack bg={"white"} w={"full"} h={"460px"} borderRadius={20} p={5}>
      <Text fontWeight={600}>Quotation Frequency</Text>
      <Stack p={5} h={"full"}>
        <LineChart />
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency