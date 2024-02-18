import { combineReducers, configureStore } from "@reduxjs/toolkit"
import bookSlicer from "./reducers/bookSlicer"
import { bookAPI } from "@/services/bookService"

const rootReducer = combineReducers({
    bookSlicer,
    [bookAPI.reducerPath]: bookAPI.reducer
})

export const setUpStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(bookAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']