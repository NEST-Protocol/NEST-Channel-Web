import {Spacer, Stack, Text, Link, Wrap, WrapItem} from "@chakra-ui/react";
import { FC } from "react";

const Information = () => {
  return (
    <Stack bg={"white"} w={"full"} borderRadius={"20px"} p={"20px"}>
      <Text fontWeight={"bold"}>Information</Text>
      <Wrap justify={"space-between"}>
        <InformationDetail title={"ChannelId"} value={1}/>
        <InformationDetail title={"Number of Quotes"} value={1}/>
        <InformationDetail title={"Fee Balance"} value={30} unit={"BNB"}/>
        <InformationDetail title={"Standard Output"} value={24} unit={"/Block"}/>
        <InformationDetail title={"Total Mining Token"} value={24000} unit={"LYK"}/>
        <InformationDetail title={"Mining Token"} value={"0x2455...6784"} link={"1234"}/>
        <InformationDetail title={"Initial Block"} value={3049581}/>
        <InformationDetail title={"Quotation Fee"} value={0}/>
        <InformationDetail title={"Price Token"} value={"0x2455...6784"} link={"1234"}/>
        <InformationDetail title={"Price Calling Fee"} value={0.005} unit={"BNB"}/>
        <InformationDetail title={"Attenuation Factor"} value={80} unit={"%"}/>
        <InformationDetail title={"Quotation Token"} value={"0x2455...6784"} link={"1234"}/>
      </Wrap>
    </Stack>
  )
}

type InformationDetailProps = {
  title: string
  value: string | number
  unit?: string
  link?: string
}

const InformationDetail: FC<InformationDetailProps> = ({...props}) => {
  return (
    <WrapItem>
      <Stack direction={"row"} w={"300px"}>
        <Text color={"secondary"} fontWeight={"600"}>{ props.title }</Text>
        <Spacer/>
        { props.link ? (
          <Link href={props.link} isExternal color={"link"} fontWeight={"bold"}>{props.value} {props.unit}</Link>
        ) : (
          <Text fontWeight={"bold"}>{ props.value } {props.unit}</Text>
        ) }
      </Stack>
    </WrapItem>
  )
}

export default Information