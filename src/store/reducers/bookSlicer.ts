import { IBook } from "@/models/Book"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit";
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
        booksAppend(state, action: PayloadAction<IBook[]>) {
            // state.books = [...state.books];
            action.payload.forEach(element => state.books.push(element))
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
        })
      },
        
})

export default bookSlicer.reducer