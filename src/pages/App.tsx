import * as React from "react"
import {HashRouter, Route, Routes} from "react-router-dom"
import Root from "./Root";

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Root/>}/>
      <Route/>
    </Routes>
  </HashRouter>
)
