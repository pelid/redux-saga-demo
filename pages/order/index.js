import { createStore } from 'redux'
import { channel, delay } from 'redux-saga'
import { take } from 'redux-saga/effects'

import './page.tag.html'
import './blocking-preloader.tag.html'

function reduceFormErrors(state={errors: []}, action){
  return action.type == 'GOT_ERRORS' ? {errors: action.payload} : state
}

export default function*(){

  // 1. отобразим прелоадер
  riot.mount('#page-container', 'order-preloader-page')

  // 2. загрузим данные с сервера
  // используем api github в целях демонстрации
  let response = yield fetch(`https://api.github.com/orgs/devmanorg/repos`)
  let repos = yield response.json()

  // создадим канал для событий - действий пользователя
  let pageChannel = channel()

  let store = createStore(reduceFormErrors)

  // 3. отобразим страницу с заказом
  riot.mount('#page-container', 'order-page', {
    pageChannel,
    store,
  })

  let attemptsCounter = 0

  while(true){
    attemptsCounter += 1

    // 4. дождемся ввода пользователя
    let formData = yield take(pageChannel)

    // 5. эмулируем отправку данных на сервер
    yield delay(1000)
    let errors = [`Адрес не найден. Попытка #${attemptsCounter}`]

    // если все ОК - переправим на новую страницу
    if (!errors.length)
      return window.location = `/order/success`

    // 6. отобразим ошибки
    store.dispatch({
      type: 'GOT_ERRORS',
      payload: errors
    })
  }
}
