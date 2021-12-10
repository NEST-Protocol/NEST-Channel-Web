import {Button, Stack, Text} from "@chakra-ui/react";
import Step1, {Tip1} from "./Step1";
import Step2, {Tip2} from "./Step2";
import Step3, {Tip3} from "./Step3";
import Done from "./Done";
import Divider from "../../components/Divider";
import {FC} from "react";
import {atom, useRecoilState} from "recoil";

const steps = [
  {id: 0, label: 'Token Address', content: <Step1/>},
  {id: 1, label: 'Configuration', content: <Step2/>},
  {id: 2, label: 'Confirm', content: <Step3/>},
];

const tips = [
  {id: 0, label: "Token Address", content: <Tip1/>},
  {id: 1, label: "Configuration", content: <Tip2/>},
  {id: 2, label: "Confirm", content: <Tip3/>},
]

const activeStepAtom = atom({
  key: 'activeStep',
  default: 0,
});

const OpenChanel = () => {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom)

  return (
    <Stack h={"full"} w={"full"} p={"20px"} spacing={"20px"}>
      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"} alignItems={"center"} spacing={"0"}>
        <Stack direction={"row"} w={"800px"} alignItems={"center"} fontWeight={"bold"} spacing={"20px"} whiteSpace={"nowrap"}>
          <StepItem  id={0} title={"Token Address"}/>

          <Divider active={activeStep >= 1}/>

          <StepItem  id={1} title={"Configuration"}/>

          <Divider active={activeStep >= 2}/>

          <StepItem  id={2} title={"Confirm"}/>
        </Stack>
        {steps.map((step) => (
          <Stack hidden={activeStep !== step.id} key={step.id}>
            { step.content }
          </Stack>
        ))}
        { activeStep === 3 ? (
          <Done/>
        ) : (
          <Button w={"176px"} onClick={()=> {
            const newStep = activeStep + 1
            setActiveStep(newStep)
          }}>
            {activeStep === steps.length - 1 ? "Create" : "Next"}
          </Button>
        ) }
      </Stack>

      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"} alignItems={"center"} spacing={"0"} hidden={activeStep === 2 || activeStep === 3}>
        {tips.map((tip) => {
          return (
            <Stack hidden={activeStep !== tip.id } key={tip.id}>
              { tip.content }
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

type StepItemProps = {
  title: string,
  id: number,
}

const StepItem: FC<StepItemProps> = ({...props}) => {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom)

  return (
    <>
      <Button w={"40px"} variant={activeStep >= props.id ? "solid" : "outline"} onClick={()=>{
        setActiveStep(props.id)
      }} color={activeStep >= props.id ? "white" : "secondary.500"}
              borderColor={activeStep >= props.id ? "primary.500" : "secondary.500"}>
        { props.id + 1 }
      </Button>
      <Text color={activeStep >= props.id ? "black" : "secondary.500"}>{props.title}</Text>
    </>
  )
}

export default OpenChanel