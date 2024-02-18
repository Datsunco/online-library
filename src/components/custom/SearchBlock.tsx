import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ButtonLoading } from '../loadingButton'
import { useAppDispath, useAppSelector } from '../../hooks/redux'
import { fetchBooks } from "../../store/reducers/ActionCreators"
import { useEffect, useState } from "react"
import { Input } from '../ui/input'
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { bookAPI } from "@/services/bookService"
import BookCard from "./Bookcard"
import { count } from "console"

function Search() {
    const [inputState, setInputState] = useState('')
    const [searchState, setSearchState] = useState('')
    const [booksState, setBooksState] = useState({ name: '', count: 1 })
    const [counter, setCounter] = useState(1)
    const { data: books, isLoading, refetch } = bookAPI.useFetchAllBooksQuery(booksState)


    const [selectState, setSelectState] = useState('')

    return (
        <>

            <div style={{ display: 'flex', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Input onChange={(e) => setInputState(e.target.value)} />
                <Button variant={'default'} onClick={() => setBooksState({ name: inputState, count: booksState.count })}>Найти</Button>
            </div>
            <Select onValueChange={(e) => setSelectState(e)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="biography">Computers</SelectItem>
                </SelectContent>
            </Select>
            <div>Всего {books?.totalItems} Книг</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {books?.items && books.items.map((book, index) => {
                    return (
                        <BookCard key={index} book={book} />
                    )
                })
                }
            </div>
            {isLoading ? <ButtonLoading /> : <Button onClick={() => setBooksState({ name: booksState.name, count: booksState.count + 1 })}>Load more</Button>}
        </>
    )
}

export default Search
