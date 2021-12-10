import * as React from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import Root from "./Root";
import {Center, Stack} from "@chakra-ui/react";
import {Logo} from "../components/Logo";
import OpenChanel from "./OpenChanel";

export const App = () => (
  <Stack spacing={0} w={"full"} h={"full"}>
    <Header/>
    <Center>
      <Content/>
    </Center>
  </Stack>
)

const Header = () => {
  return (
    <Stack w={"full"} h={"66px"} justifyContent={"center"} alignItems={"center"}>
      <Logo w={"88px"} h={"28px"}/>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={"rgba(255,255,255, 0.5)"} borderRadius={"20px"} w={"container.xl"} h={"full"} mx={"20px"} mb={"20px"}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/create" element={<OpenChanel />}/>
          <Route/>
        </Routes>
      </HashRouter>
    </Stack>
  )
}
