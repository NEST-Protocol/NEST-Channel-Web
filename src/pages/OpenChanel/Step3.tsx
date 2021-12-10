import {Link, Spacer, Stack, Text} from "@chakra-ui/react";
import {FC} from "react";

const Step3 = () => {
  return (
    <Stack pt={"60px"} pb={"30px"} w={"600px"} spacing={"20px"}>
      <ConfirmDetail title={"Price Token (PUSD):"} value={"0x0000000"} link={"eeee"}/>
      <ConfirmDetail title={"Quotation Token (PETH):"} value={"0x0000000"} link={"eeee"}/>
      <ConfirmDetail title={"Mining Token (NEST):"} value={"0x0000000"} link={"eeee"}/>
      <ConfirmDetail title={"Price Token Unit:"} value={"1"} unit={"ETH"}/>
      <ConfirmDetail title={"Standard Output:"} value={"10"} unit={"NEST/Block"}/>
      <ConfirmDetail title={"Quotation Fee:"} value={"0.01"} unit={"ETH"}/>
      <ConfirmDetail title={"Price Calling Fee:"} value={"0.001"} unit={"ETH"}/>
      <ConfirmDetail title={"Attenuation Factor:"} value={"80"} unit={"%"}/>
    </Stack>
  )
}

type ConfirmDetailProps = {
  title: string
  value: string | number
  unit?: string
  link?: string
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({...props}) => {
  return (
    <Stack direction={"row"} w={"540px"}>
      <Text color={"secondary"} fontWeight={"600"}>{ props.title }</Text>
      <Spacer/>
      { props.link ? (
        <Link href={props.link} isExternal color={"link"} fontWeight={"bold"}>{props.value} {props.unit}</Link>
      ) : (
        <Text fontWeight={"bold"}>{ props.value } {props.unit}</Text>
      ) }
    </Stack>
  )
}

export const Tip3 = () => {
  return <></>
}

export default Step3