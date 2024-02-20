import { IBook } from "@/models/Book";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface reqDataType {
    search: string,
    count: number,
    category: string
}

//Структура для ответа от сервака по запросу поиска книг
interface AllBooksResp{
    items: IBook[],
    kind: string,
    totalItems: number
}

//Структура для ответа от сервака по запросу информации о конкретной книги
interface CurrentBookResp{
    volumeInfo: {
        authors: string[],
        title: string,
        categories: string[],
        description: string,
        imageLinks: {
            thumbnail: string
        }
    },
}

export const fetchCurrentBook = createAsyncThunk(
    'books/fetchCurrent',
    async (id: string, thunkApi) => {
        try{
            const response = await axios.get<CurrentBookResp>(`https://www.googleapis.com/books/v1/volumes/${id}`)
            return response.data
        } catch(e){
            return thunkApi.rejectWithValue('Произошла беда')
        }
        

    }
)

export const fetchMoreBooks = createAsyncThunk(
    'books/fetchMore',
    async (reqData: reqDataType, thunkApi) => {
        try{
            const {search, count, category} = reqData
            const response = await axios.get<AllBooksResp>(`https://www.googleapis.com/books/v1/volumes?q=${search.replace(/\s/g, '+')}${category == 'none' ? '' : '+subject:'+category}+intitle:${search.replace(/\s/g, '+')}&startIndex=${(count-1)*30}&maxResults=${30}`)
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
            const {search, count, category} = reqData
            const response = await axios.get<AllBooksResp>(`https://www.googleapis.com/books/v1/volumes?q=${search.replace(/\s/g, '+')}${category == 'none' ? '' : '+subject:'+category}+intitle:${search.replace(/\s/g, '+')}&startIndex=${(count-1)*30}&maxResults=${30}`)
            return response.data
        } catch(e){
            return thunkApi.rejectWithValue('Произошла беда')
        }
        

    }
)