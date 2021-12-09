import * as React from "react"
import ReactDOM from "react-dom"
import {App} from "./pages/App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import {ChakraProvider} from "@chakra-ui/react"
import theme from "./theme"
import {createGlobalStyle} from "styled-components"
import "@fontsource/montserrat"
import "focus-visible/dist/focus-visible"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", serif;
  }
  
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const Updaters = () => {
  return <></>
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalStyle/>
      <Updaters/>
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
