import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentBook } from "./ActionCreators";


export interface CurrentBookState{
    authors: string[],
    image: string,
    categories: string[],
    title: string,
    description: string,
    error: null | string,
    isLoading: boolean
}

const initialState: CurrentBookState = {
    authors: [''],
    image: '',
    categories: [''],
    title: '',
    description: '0',
    error: '',
    isLoading: false,
}

export const currentBooksSlicer = createSlice({
    name: 'book',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentBook.fulfilled, (state, action) => {
            state.image = action.payload.volumeInfo.imageLinks.thumbnail
            state.title = action.payload.volumeInfo.title
            state.description = action.payload.volumeInfo.description
            state.authors = action.payload.volumeInfo.authors
            state.categories = action.payload.volumeInfo.categories
            state.isLoading = false
            state.error = ''
        }),
        builder.addCase(fetchCurrentBook.pending, (state) => {
            state.isLoading = true
        })
    },
})

export default currentBooksSlicer.reducer