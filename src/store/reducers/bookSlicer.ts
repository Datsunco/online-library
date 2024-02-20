import { IBook } from "@/models/Book"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchAllBooks, fetchMoreBooks } from "./ActionCreators";

export interface BookState{
    books: IBook[];
    isLoading: boolean;
    error: null | string;
    count: number;
    search: string;
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: '',
    count: 0,
    search: ''
}


export const bookSlicer = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
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
        builder.addCase(fetchMoreBooks.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(fetchAllBooks.pending, (state) => {
            state.isLoading = true
        })
      },
        
})

export default bookSlicer.reducer