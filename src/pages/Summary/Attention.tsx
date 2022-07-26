import {HStack, Stack, Text, chakra, Link, useMediaQuery, Spacer} from "@chakra-ui/react";
import miningUrl from '../../assets/svg/mining_icon.svg'
import callingUrl from '../../assets/svg/calling_icon.svg'
import rightUrl from '../../assets/svg/RIGHT_2_icon.svg'

const Attention = () => {
  const list = [
    {id: 1, icon: miningUrl, label: 'How to Mining?', link: 'https://www.nestprotocol.org/#/docs/NEST-Oracle/Mining-on-NEST-Oracle.md'},
    {id: 2, icon: callingUrl, label: 'How to Calling?', link: 'https://www.nestprotocol.org/#/docs/NEST-Oracle/Calling-Price.md'},
  ]
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack bg={'white'} w={'full'} minH={'60px'} borderRadius={'12px'} px={'20px'} py={isLargerThan1024 ? '8px' : '22px'} alignItems={'center'}
           direction={'row'} border={"1px solid"} borderColor={"secondary.300"}>
      { isLargerThan1024 && (
        <Text fontWeight={'semibold'} mr={'88px'}>
          Attention
        </Text>
      ) }
      <Stack direction={isLargerThan1024 ? "row" : "column"} spacing={isLargerThan1024 ? '44px' : '22px'} w={'full'}>
        {
          list.map((item) => (
            <HStack
              key={item.id} cursor={"pointer"}
              spacing={'22px'}>
              <chakra.img src={item.icon} alt={''} />
              <Link href={item.link} isExternal fontWeight={'semibold'} fontSize={'15px'}>{item.label}</Link>
              { !isLargerThan1024 && (
                <Spacer />
              ) }
              <chakra.img src={rightUrl} alt={''} _hover={{transform: 'translateX(8px)'}}/>
            </HStack>
          ))
        }
      </Stack>
    </Stack>
  )
}



export default Attention