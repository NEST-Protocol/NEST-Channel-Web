import {Button, Spacer, Stack} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [
  { label: 'Token Address', content: <Step1 /> },
  { label: 'Configuration', content: <Step2 />  },
  { label: 'Confirm', content: <Step3 />  },
];


const OpenChanel = () => {
  const { nextStep, setStep, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Stack h={"full"} w={"full"} p={"20px"} spacing={"20px"}>
      <Stack bg={"white"} px={"190px"} py={"60px"} borderRadius={"20px"}>
        <Steps onClickStep={(step) => setStep(step)} activeStep={activeStep}>
          {steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
        <Spacer />
        <Stack alignItems={"center"}>
          <Button onClick={nextStep} w={"176px"}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default OpenChanel