import { IBook } from "@/models/Book";
import { AppDispatch } from "..";
import axios from "axios";
import {bookSlicer} from "./bookSlicer";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(bookSlicer.actions.booksFetching())
        const response = await axios.get<IBook[]>('https://www.googleapis.com/books/v1/volumes?q=intitle:The+Great+Gatsby')
        console.log(response.data)
        dispatch(bookSlicer.actions.booksFetchingSuccess(response.data))
    }catch(e){
        // dispatch(bookSlicer.actions.booksFetchingError(e.message))
    }    
}

// export const fetchBooks = createAsyncThunk(
//     'books/fetchAll',
//     async (_, thunkApi) => {
//         const response = await axios.get<IBook[]>('https://www.googleapis.com/books/v1/volumes?q=intitle:The+Great+Gatsby')
//         return response.data

//     }
// )