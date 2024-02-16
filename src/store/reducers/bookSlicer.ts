import { IBook } from "@/models/Book"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks } from "./ActionCreators";

export interface BookState{
    books: IBook[];
    isLoading: boolean;
    error: null | string;
    count: number;
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: '',
    count: 0,
}


export const bookSlicer = createSlice({
    name: 'book',
    initialState,
    reducers: {
        booksFetching(state) {
            state.isLoading = true
        },
        booksFetchingSuccess(state, action: PayloadAction<IBook[]>) {
            state.isLoading = false
            state.error = ''
            state.books = action.payload
        },
        booksFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    },
    // extraReducers: {
    //     [fetchBooks.fulfilled.type]: (state, action: PayloadAction<IBook[]>){
    //         state.isLoading = false
    //         state.error = ''
    //         state.books = action.payload
    //     },
    //     [fetchBooks.rejected.type]: (state, action: PayloadAction<IBook[]>){
    //         state.isLoading = false
    //         state.error = ''
    //         state.books = action.payload
    //     },
    // }
})

export default bookSlicer.reducer