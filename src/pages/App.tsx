import * as React from "react"
import {Route, Routes, useNavigate} from "react-router-dom"
import Root from "./Root";
import {Button, Center, Stack} from "@chakra-ui/react";
import {Logo} from "../components/Logo";
import OpenChanel from "./Create";

export const App = () => {
  return (
    <Stack spacing={0} w={"full"} h={"full"}>
      <Header/>
      <Center>
        <Content/>
      </Center>
    </Stack>
  )
}

const Header = () => {
  const navigate = useNavigate()
  return (
    <Stack w={"full"} h={"60px"} justifyContent={"center"} alignItems={"center"} mb={"6px"}>
      <Button variant={"ghost"} onClick={()=> {
        navigate("/")
      }}>
        <Logo w={"88px"} h={"28px"}/>
      </Button>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack background={"rgba(255,255,255, 0.5)"} borderRadius={"20px"} w={"container.xl"} h={"full"} mx={"20px"}
           mb={"20px"}>
      <Routes>
        <Route path="/" element={<Root/>}/>
        <Route path="/create" element={<OpenChanel/>}/>
        <Route/>
      </Routes>
    </Stack>
  )
}
