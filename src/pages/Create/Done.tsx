import { Button, Stack, Text } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { activeStepAtom } from '../../state/Create/activeStepAtom'
import { useNavigate } from 'react-router-dom'

const Done = () => {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom)
  const navigate = useNavigate()

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} h={'400px'} spacing={'20px'} alignItems={'center'}>
      <Text>Done!</Text>
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
