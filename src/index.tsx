import * as React from 'react'
import ReactDOM from 'react-dom'
import { App } from './pages/App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import 'focus-visible/dist/focus-visible'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary'
import { NetworkContextName } from './constants/misc'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
