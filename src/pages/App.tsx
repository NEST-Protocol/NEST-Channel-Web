import * as React from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import Root from "./Root";
import {Center, Stack} from "@chakra-ui/react";
import {Logo} from "../components/Logo";

export const App = () => (
  <Stack spacing={0}>
    <Background/>
    <Header/>
    <Center>
      <Content/>
    </Center>
  </Stack>
)

const Background = () => {
  return (
    <Stack h={"100vh"} w={"100vw"} bg={"black"} zIndex={"hide"} position={"absolute"}>
    </Stack>
  )
}

const Header = () => {
  return (
    <Stack w={"100vw"} h={"60px"} justifyContent={"center"} alignItems={"center"}>
      <Logo w={88} h={28}/>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={"rgba(255,255,255, 0.5)"} borderRadius={20} w={"1366px"} h={"792px"} mx={"22px"}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route/>
        </Routes>
      </HashRouter>
    </Stack>
  )
}
