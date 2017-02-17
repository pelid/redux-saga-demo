import _ from 'lodash'
import { select, take, call} from 'redux-saga/effects'
import { takeLatest, channel } from 'redux-saga'
import route from 'riot-route'

export function* runRouting(routes){
  // запускается единожды при инициализации приложения
  let routerChannel = channel()

  // при изменении window.location забрасываем в routerChannel новое событие
  // используем для этого riot-route но подойдет любая другая библиотека - роутер
  function registerRoute([urlPattern, saga]){
    route(urlPattern, ()=>routerChannel.put(saga))
  }
  _.forEach(routes, registerRoute)
  route.start(true)

  // при каждом событии в routerChannel
  // останавливаем предыдущую function* и запускаем новую
  yield* takeLatest(routerChannel, function*(saga){

    try {
      yield* saga() // передаем управление в функцию saga, ждем её завершения
    } catch (error){
      // проглатываем исключение чтобы не порушить все приложение
      console.error(error)
    }

  })
}
