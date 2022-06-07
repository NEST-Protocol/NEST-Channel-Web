import {Box, Stack, Text, useMediaQuery} from '@chakra-ui/react'
import LineChart from '../../components/LineChart'
import {useCallback, useEffect, useState} from 'react'
import useInterval from '@use-it/interval'
import {useRecoilValue} from 'recoil'
import {activeChannelIdAtom} from '../../state/Summary'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const QuotationFrequency = () => {
  const [data, setData] = useState([])
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const {chainId} = useActiveWeb3React()
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const asyncFetch = useCallback(async () => {
    try {
      const q = await fetch(`https://nestdapp.io/nestwebApi/listOracleQuoteData/${chainId}/${activeChannelId}/20`)
      const res = await q.json()
      if (res?.value) {
        setData(res.value)
      } else {
        console.log('refresh data failed')
      }
    } catch (e) {
      console.log('refresh data failed')
    }
  }, [chainId, activeChannelId])

  useEffect(() => {
    asyncFetch()
  }, [asyncFetch])
  useInterval(() => asyncFetch(), 120000)

  return (
    <Stack bg={'white'} w={'full'} h={isLargerThan1024 ? '460px' : '320px'} spacing={0} borderRadius={'12px'}
           p={isLargerThan1024 ? '20px' : '0'} border={"1px solid"} borderColor={"secondary.300"}>
      <Text fontWeight={'bold'} hidden={!isLargerThan1024}>Quotation Frequency (Last 20 quotes)</Text>
      <Stack p={'20px'} h={'full'} w={'full'} alignItems={"center"}>
        <Text fontSize={'xs'} fontWeight={'medium'} pb={'10px'}>Interval from last quotation</Text>
        <Box w={'full'} h={'full'}>
          <LineChart data={data} xField={'index'} yField={'second'}/>
        </Box>
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency
