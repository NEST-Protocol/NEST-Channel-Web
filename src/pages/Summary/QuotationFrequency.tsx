import {Box, Stack, Text, useMediaQuery} from '@chakra-ui/react'
import LineChart from '../../components/LineChart'
import { useCallback, useEffect, useState } from 'react'
import useInterval from '@use-it/interval'
import { useRecoilValue } from 'recoil'
import { activeChannelIdAtom } from '../../state/Summary'

const QuotationFrequency = () => {
  const [data, setData] = useState([])
  const activeChannelId = useRecoilValue(activeChannelIdAtom)
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  const asyncFetch = useCallback(() => {
    fetch('https://nestdapp.io/nestwebApi/listOracleQuoteData/' + activeChannelId + '/20')
      .then((response) => response.json())
      .then((json) => setData(json.value))
      .catch((error) => {
        console.log('refresh data failed', error)
      })
  }, [activeChannelId])

  useEffect(() => {
    asyncFetch()
  }, [activeChannelId, asyncFetch])
  useInterval(() => asyncFetch(), 120000)

  return (
    <Stack bg={'white'} w={'full'} h={isLargerThan1024 ? '460px' : '320px'} spacing={0} borderRadius={'20px'} p={isLargerThan1024 ? '20px' : '0'} border={"1px solid"} borderColor={"#EEEEEE"}>
      <Text fontWeight={'bold'} hidden={!isLargerThan1024}>Quotation Frequency (Last 20 quotes)</Text>
      <Stack p={'20px'} h={'full'} w={'full'} alignItems={"center"}>
        <Text fontSize={'xs'} fontWeight={'medium'} pb={'10px'}>Interval from last quotation</Text>
        <Box w={'full'} h={'full'}>
          <LineChart data={data} xField={'index'} yField={'second'} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency
