import { combineReducers, legacy_createStore as createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { storageReducers } from './reducer/redux/post.reducer'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  storage: storageReducers,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
