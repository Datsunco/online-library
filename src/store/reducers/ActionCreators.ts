import { IBook } from "@/models/Book";
import { AppDispatch } from "../store";
import axios from "axios";
import {bookSlicer} from "./bookSlicer";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface reqDataType {
    search: string,
    count: number
}

interface BookResp{
    items: IBook[],
    kind: string,
    totalItems: number
}

export const fetchMoreBooks = createAsyncThunk(
    'books/fetchMore',
    async (reqData: reqDataType, thunkApi) => {
        try{
            const {search, count} = reqData
            const response = await axios.get<BookResp>(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search.replace(/\s/g, '+')}&startIndex=${(count-1)*30}&maxResults=${30}`)
            return response.data
        } catch(e){
            return thunkApi.rejectWithValue('Произошла беда')
        }
        

    }
)

export const fetchAllBooks = createAsyncThunk(
    'books/fetchAll',
    async (reqData: reqDataType, thunkApi) => {
        try{
            const {search, count} = reqData
            const response = await axios.get<BookResp>(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search.replace(/\s/g, '+')}&startIndex=${(count-1)*30}&maxResults=${30}`)
            return response.data
        } catch(e){
            return thunkApi.rejectWithValue('Произошла беда')
        }
        

    }
)