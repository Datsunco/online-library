import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import bookSlicer from "./reducers/bookSlicer"

const rootReducer = combineReducers({
    userReducer,
    bookSlicer
})

export const setUpStore = () =>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']