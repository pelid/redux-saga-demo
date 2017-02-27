import _ from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {runRouting} from './router.js'

import runIndexPage from './pages/index-page'
import runOrderPage from './pages/order'
import runPageWithPreloader from './pages/preloader'
import runCounterPage from './pages/counter/'

const urlScheme = [
  ['/', runIndexPage],
  ['/order', runOrderPage],
  ['/counter', runCounterPage],
  ['/preloader', runPageWithPreloader]
]

const sagaMiddleware = createSagaMiddleware()
const globalStore = createStore(
  _.noop,
  applyMiddleware(sagaMiddleware), // launch main loop of redux-saga to initialize it
)

// запускаем роутер, передаем ему URL схему
sagaMiddleware.run(runRouting, urlScheme)
