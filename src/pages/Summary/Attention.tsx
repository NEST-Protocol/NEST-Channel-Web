import {HStack, Stack, Text} from "@chakra-ui/react";

const Attention = () => {
  const list = [
    {id: 1, icon: '', label: 'How to Mining?', link: ''},
    {id: 2, icon: '', label: 'How to Calling?', link: ''},
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
              onClick={() => {
                window.open(item.link)
              }}>
              <Text fontWeight={'semibold'} fontSize={'15px'}>{item.label}</Text>
            </HStack>
          ))
        }
      </Stack>
    </Stack>
  )
}

export default Attention