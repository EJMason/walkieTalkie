import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux' 

import App from './components/App'
import store from './store'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const app = document.getElementById('App')

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, app)

