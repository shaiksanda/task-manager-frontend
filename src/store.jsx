import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { taskService } from "./services/taskService"
import authReducer from "./features/authSlice"

import { persistStore,persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import selectedReducer from "./features/selectedSlice"



const selectPersistConfig={
    key:"selected",
    storage
}

const authPersistConfig={
  key:"auth",
  storage
}


const selectPersistedReducer=persistReducer(selectPersistConfig,selectedReducer)
const authPersistedReducer=persistReducer(authPersistConfig,authReducer)


const store=configureStore({
    reducer:{
        [taskService.reducerPath]:taskService.reducer,
        selected:selectPersistedReducer,
        auth:authPersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions:  [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER"
        ]
      },
    }).concat(taskService.middleware)
})

export default store
export const persistor = persistStore(store);

setupListeners(store.dispatch)