import {Button, HStack, Stack, Text, useMediaQuery, VStack} from '@chakra-ui/react'
import TokenAddress, { TokenAddressTip } from './TokenAddress'
import Configuration, { ConfigurationTip } from './Configuration'
import Confirm, { ConfirmTip } from './Confirm'
import Done from './Done'
import Divider from '../../components/Divider'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { activeStepAtom } from '../../state/Create'
import { useCreateChannel } from '../../hooks/useCreateChannel'
import { PROCESSING } from '../../constants/misc'

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
  const { invalidTokenAddress, invalidConfiguration, create, status } = useCreateChannel()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const StepButton: FC<StepItemProps> = ({ ...props }) => {
    if (isLargerThan1024) {
      return (
        <HStack spacing={'20px'}>
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
        </HStack>
      )
    } else {
      return (
        <VStack>
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
          <Text color={activeStep >= props.id ? 'black' : 'secondary.500'} fontSize={'10px'}>{props.title}</Text>
        </VStack>
      )
    }
  }

  return (
    <Stack p={'20px'} spacing={'20px'}>
      <Stack
        bg={'white'}
        px={isLargerThan1024 ? '190px' : '24px'}
        pt={isLargerThan1024 ? '68px' : '24px'}
        pb={ '36px'}
        borderRadius={'20px'}
        alignItems={'center'}
        spacing={'0'}
        border={"1px solid"} borderColor={"#EEEEEE"}
      >
        <Stack
          direction={'row'}
          w={isLargerThan1024 ? '800px' : 'full'}
          alignItems={'center'}
          fontWeight={'bold'}
          spacing={isLargerThan1024 ? '20px' : '8px'}
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
            w={isLargerThan1024 ? '176px' : '80%'}
            isLoading={status === PROCESSING}
            disabled={activeStep === steps.length - 1 ? invalidTokenAddress || invalidConfiguration : false}
            onClick={async () => {
              if (activeStep === steps.length - 1) {
                await create()
              }
              const newStep = activeStep + 1
              setActiveStep(newStep)
            }}
          >
            {activeStep === steps.length - 1 ? 'Create' : 'Next'}
          </Button>
        )}
      </Stack>

      <Stack
        bg={'white'}
        px={isLargerThan1024 ? '190px' : '24px'}
        py={isLargerThan1024 ? '60px' : '24px'}
        borderRadius={'20px'}
        alignItems={'center'}
        spacing={'0'}
        hidden={activeStep === 2 || activeStep === 3}
        border={"1px solid"} borderColor={"#EEEEEE"}
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
