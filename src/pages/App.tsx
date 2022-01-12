import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Summary from './Summary'
import { Button, Spacer, Stack } from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import OpenChanel from './Create'
import Web3ReactManager from '../components/Web3ReactManager'
import NetworkCard from '../components/NetworkCard'
import { GoogleAnalyticsReporter } from '../components/analytics/GoogleAnalyticsReporter'

export const App = () => {
  return (
    <Web3ReactManager>
      <Stack spacing={0} w={'full'} h={'full'} alignItems={'center'} pb={'20px'}>
        <Header />
        <Content />
      </Stack>
    </Web3ReactManager>
  )
}

const Header = () => {
  return (
    <Stack w={'container.xl'} h={'60px'} direction={'row'} justifyContent={'center'} alignItems={'center'} mb={'6px'}>
      <Button
        position={'absolute'}
        variant={'ghost'}
        onClick={() => {
          const w = window.open('about:blank')
          // @ts-ignore
          w.location.href = 'https://nestprotocol.org/'
        }}
      >
        <Logo w={'88px'} h={'28px'} />
      </Button>
      <Spacer />
      <NetworkCard />
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={'rgba(255,255,255, 0.5)'} borderRadius={'20px'} w={'container.xl'} h={'full'}>
      <Routes>
        <Route element={<GoogleAnalyticsReporter />} />
        <Route path="/" element={<Summary />} />
        <Route path="/create" element={<OpenChanel />} />
        <Route />
      </Routes>
    </Stack>
  )
}
