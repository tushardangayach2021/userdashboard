import { combineReducers, createStore } from "redux";
import { Users } from "./users";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist' // for persist store
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from "redux-logger";
import { applyMiddleware } from "redux";
const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, Users)
export const ConfigureStore = ()=> {
    const store=createStore(
        combineReducers({
            users: persistedReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk, logger)

    );
    let persistor = persistStore(store)
    return { store, persistor }
}