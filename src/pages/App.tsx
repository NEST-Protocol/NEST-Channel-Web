import * as React from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import Root from "./Root";
import {Center, Stack} from "@chakra-ui/react";
import {Logo} from "../components/Logo";

export const App = () => (
  <Stack spacing={0} w={"100vw"}>
    <Header/>
    <Center w={"100%"}>
      <Content/>
    </Center>
  </Stack>
)

const Header = () => {
  return (
    <Stack w={"100vw"} h={"66px"} justifyContent={"center"} alignItems={"center"}>
      <Logo w={"88px"} h={"28px"}/>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={"rgba(255,255,255, 0.5)"} borderRadius={20} w={"1366px"} h={"100%"} mx={"22px"} mb={"22px"}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route/>
        </Routes>
      </HashRouter>
    </Stack>
  )
}
