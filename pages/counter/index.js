import { createStore } from 'redux'
import { delay } from 'redux-saga'

import './page.tag.html'

function reduceCounter(state={counter: 0}, action){
  return {
    counter: state.counter + (action.type == 'INCREASED')
  }
}

export default function*(){
  let pageStore = createStore(reduceCounter)
  riot.mount('#page-container', 'counter-page', {
    pageStore,
    msg: 'Cтраница c таймером'
  })
  for (let i of _.range(1, 10)){
    yield delay(1000)
    pageStore.dispatch({type:'INCREASED'})
  }
}
