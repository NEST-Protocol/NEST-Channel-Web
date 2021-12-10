import {Button, Stack, Text} from "@chakra-ui/react";
import Step1, {Tip1} from "./Step1";
import Step2, {Tip2} from "./Step2";
import Step3, {Tip3} from "./Step3";
import Done from "./Done";
import {useState} from "react";
import Divider from "../../components/Divider";

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

const OpenChanel = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Stack h={"full"} w={"full"} p={"20px"} spacing={"20px"}>
      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"} alignItems={"center"} spacing={"0"}>
        <Stack direction={"row"} w={"800px"} alignItems={"center"} fontWeight={"bold"} spacing={"20px"} whiteSpace={"nowrap"}>
          <Button w={"40px"} variant={activeStep >= 0 ? "solid" : "outline"} onClick={()=>{
            setActiveStep(0)
          }} color={activeStep >= 0 ? "white" : "secondary.500"}
                  borderColor={activeStep >= 0 ? "primary.500" : "secondary.500"}>
            1
          </Button>
          <Text color={activeStep >= 0 ? "black" : "secondary.500"}>Token Address</Text>

         <Divider active={activeStep >= 1}/>

          <Button w={"40px"} variant={activeStep >= 1 ? "solid" : "outline"} onClick={()=> {
            setActiveStep(1)
          }} color={activeStep >= 1 ? "white" : "secondary.500"} borderColor={activeStep >= 1 ? "primary.500" : "secondary.500"}>
            2
          </Button>
          <Text color={activeStep >= 1 ? "black" : "secondary.500"}>Configuration</Text>

          <Divider active={activeStep >= 2}/>

          <Button w={"40px"} variant={activeStep >= 2 ? "solid" : "outline"} onClick={()=>{
            setActiveStep(2)
          }} color={activeStep >= 2 ? "white" : "secondary.500"} borderColor={activeStep >= 2 ? "primary.500" : "secondary.500"}>
            3
          </Button>
          <Text color={activeStep >= 2 ? "black" : "secondary.500"}>Confirm</Text>
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

export default OpenChanel