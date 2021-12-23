import { Stack, Text } from '@chakra-ui/react'
import LineChart from '../../components/LineChart'
import { useCallback, useEffect, useState } from 'react'
import useInterval from '@use-it/interval'
import { useRecoilValue } from 'recoil'
import { activeChannelIdAtom } from '../../state/Summary'

const QuotationFrequency = () => {
  const [data, setData] = useState([])
  const activeChannelId = useRecoilValue(activeChannelIdAtom)

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
    <Stack bg={'white'} w={'full'} h={'460px'} borderRadius={'20px'} p={'20px'}>
      <Text fontWeight={'bold'}>Quotation Frequency</Text>
      <Stack p={'20px'} h={'full'} w={'full'}>
        <LineChart data={data} xField={'index'} yField={'second'} />
      </Stack>
    </Stack>
  )
}

export default QuotationFrequency
