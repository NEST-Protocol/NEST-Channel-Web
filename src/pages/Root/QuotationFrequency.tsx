import {Stack, Text} from "@chakra-ui/react";
import LineChart from "../../components/LineChart";

const QuotationFrequency = () => {
  return (
    <Stack bg={"white"} w={"100%"} h={"460px"} borderRadius={20} p={"22px"}>
      <Text fontWeight={600} fontSize={"17px"}>Quotation Frequency</Text>
      <Stack p={"22px"} h={"100%"}>
        <LineChart />
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency