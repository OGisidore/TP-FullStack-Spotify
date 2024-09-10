import { createRoot } from 'react-dom/client'
import store from './store'

import './index.css'

import App from './App'
import { Provider } from 'react-redux'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
