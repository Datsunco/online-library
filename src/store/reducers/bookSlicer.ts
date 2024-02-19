import { IBook } from "@/models/Book"
import { createSlice } from "@reduxjs/toolkit"
import { fetchAllBooks, fetchMoreBooks } from "./ActionCreators";

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
    name: 'books',
    initialState,
    reducers: {
        booksFetching(state) {
            state.isLoading = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoreBooks.fulfilled, (state, action) => {
            let concatedbooks = state.books.concat(action.payload.items)
            state.isLoading = false
            state.error = ''
            state.books = concatedbooks
        }),
        builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
            state.books = action.payload.items
            state.isLoading = false
            state.error = ''
            state.count = action.payload.totalItems
        }),
        builder.addCase(fetchAllBooks.pending, (state) => {
            state.isLoading = true
        })
      },
        
})

export default bookSlicer.reducer