import {Button, Stack, Text} from '@chakra-ui/react'
import {useRecoilState} from 'recoil'
import {activeStepAtom} from '../../state/Create'
import {useNavigate} from 'react-router-dom'
import useCreateChannel from "../../hooks/useCreateChannel";
import {SUCCESS} from "../../constants/misc";

const Done = () => {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom)
  const {status} = useCreateChannel()

  const navigate = useNavigate()

  if (activeStep > 4 || activeStep < 0) {
    setActiveStep(0)
  }

  return (
    <Stack w={'600px'} h={'400px'} spacing={'20px'} alignItems={'center'} justifyContent={"center"}>
      {status === SUCCESS ? (
        <Text fontWeight={"bold"}>Done!</Text>
      ) : (
        <Text fontWeight={"bold"}>Error!</Text>
      )}
      <Button
        w={'176px'}
        onClick={() => {
          setActiveStep(0)
        }}
      >
        Recreate
      </Button>
      <Button
        w={'176px'}
        variant={'outline'}
        onClick={() => {
          navigate('/')
          setActiveStep(0)
        }}
      >
        Back
      </Button>
    </Stack>
  )
}

export default Done
