import { IBook } from "@/models/Book";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BookResp{
    items: IBook[],
    kind: string,
    totalItems: number
}

interface Args{
    name: string,
    count: number,
}

export const bookAPI = createApi({
    reducerPath: 'bookAPI',
    baseQuery: fetchBaseQuery({baseUrl: "https://www.googleapis.com/"}),
    endpoints: (builder) => ({
        fetchAllBooks: builder.query<BookResp, Args>({
            query: (data) =>  ({
                url: `books/v1/volumes?q=intitle:${data.name.replace(/\s/g, '+')}&startIndex=${(data.count-1)*30}&maxResults=${30}`,
            })
        })
    })
})

export const { useFetchAllBooksQuery } = bookAPI
