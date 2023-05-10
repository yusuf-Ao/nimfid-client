import './output.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './state/store'
import { StateContext } from './state/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StateContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateContext>
  </Provider>
)
