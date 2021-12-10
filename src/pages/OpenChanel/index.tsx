import {Button, Stack} from "@chakra-ui/react";
import {Step, Steps, useSteps} from "chakra-ui-steps";
import Step1, {Tip1} from "./Step1";
import Step2, {Tip2} from "./Step2";
import Step3, {Tip3} from "./Step3";

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
  const {nextStep, setStep, activeStep} = useSteps({
    initialStep: 0,
  })

  return (
    <Stack h={"full"} w={"full"} p={"20px"} spacing={"20px"}>
      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"} alignItems={"center"} spacing={"0"}>
        <Steps onClickStep={(step) => setStep(step)} activeStep={activeStep}>
          {steps.map(({label, content}) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
        <Button onClick={nextStep} w={"176px"}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Stack>

      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"} alignItems={"center"} spacing={"0"}>
        {tips.map((tip) => {
          return (
            <Stack hidden={activeStep !== tip.id}>
              { tip.content }
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default OpenChanel