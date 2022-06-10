import {HStack, Stack, Text, chakra, Link} from "@chakra-ui/react";
import miningUrl from '../../assets/svg/mining_icon.svg'
import callingUrl from '../../assets/svg/calling_icon.svg'
import rightUrl from '../../assets/svg/RIGHT_2_icon.svg'

const Attention = () => {
  const list = [
    {id: 1, icon: miningUrl, label: 'How to Mining?', link: ''},
    {id: 2, icon: callingUrl, label: 'How to Calling?', link: ''},
  ]

  return (
    <Stack bg={'white'} w={'full'} minH={'60px'} borderRadius={'12px'} px={'20px'} py={'8px'} alignItems={'center'}
           direction={'row'} border={"1px solid"} borderColor={"secondary.300"}>
      <Text fontWeight={'semibold'} mr={'88px'}>
        Attention
      </Text>
      <Stack direction={'row'} spacing={'44px'}>
        {
          list.map((item) => (
            <HStack
              key={item.id} cursor={"pointer"}
              spacing={'22px'}>
              <chakra.img src={item.icon} alt={''} />
              <Link href={item.link} isExternal fontWeight={'semibold'} fontSize={'15px'}>{item.label}</Link>
              <chakra.img src={rightUrl} alt={''} _hover={{transform: 'translateX(8px)'}}/>
            </HStack>
          ))
        }
      </Stack>
    </Stack>
  )
}



export default Attention