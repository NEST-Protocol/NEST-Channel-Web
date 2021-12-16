import { Button, Stack, Text } from '@chakra-ui/react'
import TokenAddress, { TokenAddressTip } from './TokenAddress'
import Configuration, { ConfigurationTip } from './Configuration'
import Confirm, { ConfirmTip } from './Confirm'
import Done from './Done'
import Divider from '../../components/Divider'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { activeStepAtom } from '../../state/Create/activeStepAtom'
import useCreateChannel from '../../hooks/useCreateChannel'

const steps = [
  { id: 0, label: 'Token Address', content: <TokenAddress /> },
  { id: 1, label: 'Configuration', content: <Configuration /> },
  { id: 2, label: 'Confirm', content: <Confirm /> },
]

const tips = [
  { id: 0, label: 'Token Address', content: <TokenAddressTip /> },
  { id: 1, label: 'Configuration', content: <ConfigurationTip /> },
  { id: 2, label: 'Confirm', content: <ConfirmTip /> },
]

type StepItemProps = {
  title: string
  id: number
}

const OpenChanel = () => {
  const [activeStep, setActiveStep] = useRecoilState(activeStepAtom)
  const { invalidTokenAddress, invalidConfiguration, create } = useCreateChannel()

  const StepButton: FC<StepItemProps> = ({ ...props }) => {
    return (
      <>
        <Button
          w={'40px'}
          variant={activeStep >= props.id ? 'solid' : 'outline'}
          onClick={() => {
            setActiveStep(props.id)
          }}
          color={activeStep >= props.id ? 'white' : 'secondary.500'}
          borderColor={activeStep >= props.id ? 'primary.500' : 'secondary.500'}
        >
          {props.id + 1}
        </Button>
        <Text color={activeStep >= props.id ? 'black' : 'secondary.500'}>{props.title}</Text>
      </>
    )
  }

  return (
    <Stack p={'20px'} spacing={'20px'}>
      <Stack bg={'white'} px={'190px'} py={'60px'} borderRadius={'20px'} alignItems={'center'} spacing={'0'}>
        <Stack
          direction={'row'}
          w={'800px'}
          alignItems={'center'}
          fontWeight={'bold'}
          spacing={'20px'}
          whiteSpace={'nowrap'}
          hidden={activeStep === 3}
        >
          <StepButton id={0} title={'Token Address'} />
          <Divider active={activeStep >= 1} />
          <StepButton id={1} title={'Configuration'} />
          <Divider active={activeStep >= 2} />
          <StepButton id={2} title={'Confirm'} />
        </Stack>
        {steps.map((step) => (
          <Stack hidden={activeStep !== step.id} key={step.id}>
            {step.content}
          </Stack>
        ))}
        {activeStep === 3 ? (
          <Done />
        ) : (
          <Button
            w={'176px'}
            disabled={activeStep === steps.length - 1 ? invalidTokenAddress || invalidConfiguration : false}
            onClick={async () => {
              const newStep = activeStep + 1
              setActiveStep(newStep)

              if (activeStep === steps.length - 1) {
                create()
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Create' : 'Next'}
          </Button>
        )}
      </Stack>

      <Stack
        bg={'white'}
        px={'190px'}
        py={'60px'}
        borderRadius={'20px'}
        alignItems={'center'}
        spacing={'0'}
        hidden={activeStep === 2 || activeStep === 3}
      >
        {tips.map((tip) => {
          return (
            <Stack hidden={activeStep !== tip.id} key={tip.id}>
              {tip.content}
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default OpenChanel
