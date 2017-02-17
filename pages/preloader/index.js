import { createStore } from 'redux'
import { delay } from 'redux-saga'

import './page.tag.html'

const PRELOADER_INITIAL_STATE = {
  isRunning: false,
}

function reducePreloader(state=PRELOADER_INITIAL_STATE, action){

  switch (action.type) {
    case 'TASK_STARTED':
      return { isRunning: true }
    case 'TASK_STOPPED':
      return { isRunning: false }
    default:
      return state
  }
}

export default function*(){

  let store = createStore(reducePreloader)

  const viewContext = {
    store,
  }
  riot.mount('#page-container', 'page-with-preloader', viewContext)

  store.dispatch({type: 'TASK_STARTED'})

  yield delay(5000) // эмулируем долгий запрос к серверу

  store.dispatch({type: 'TASK_STOPPED'})

}
