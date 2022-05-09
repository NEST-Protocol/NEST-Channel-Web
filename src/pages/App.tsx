import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Summary from './Summary'
import {Button, Link, Stack, useMediaQuery} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import OpenChanel from './Create'
import Web3ReactManager from '../components/Web3ReactManager'
import NetworkCard from '../components/NetworkCard'

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
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack w={isLargerThan1024 ? 'container.xl' : 'full'} p={'20px'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Link href={'https://nestprotocol.org/'} isExternal>
        <Logo w={isLargerThan1024 ? '88px' : '44px'} h={isLargerThan1024 ? '28px' : '14px'} />
      </Link>
      <NetworkCard />
    </Stack>
  )
}

const Content = () => {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')

  return (
    <Stack background={isLargerThan1024 ? 'rgba(255,255,255, 0.5)' : ''} borderRadius={'20px'} w={isLargerThan1024 ? 'container.xl' : 'full'} h={'full'}>
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/create" element={<OpenChanel />} />
        <Route />
      </Routes>
    </Stack>
  )
}
