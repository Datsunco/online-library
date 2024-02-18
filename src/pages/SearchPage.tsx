import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import BookCard from "@/components/custom/Bookcard";
import { ButtonLoading } from "@/components/loadingButton";
import { useAppDispath, useAppSelector } from "@/hooks/redux";
import { fetchAllBooks, fetchMoreBooks } from "@/store/reducers/ActionCreators";
import { useEffect, useState, useRef } from "react";

const SearchPage = () => {
    const searchInput = useRef(null)
    const [searchData, setSearchData] = useState('')
    const [counter, setCounter] = useState(0)
    const dispatch = useAppDispath()
    const { books, isLoading, count } = useAppSelector(state => state.bookSlicer)

    const onClickSearchButton = () => {
        dispatch(fetchAllBooks({
            search: searchData,
            count: 1
        }))
        setCounter(1)
    }

    const onClickLoadMoreButton = () => {
        dispatch(fetchMoreBooks({
            search: searchData,
            count: counter + 1
        }))
        setCounter(counter + 1)
    }

    const onKeyDown = (e: any) => {
        if (e.key == 'Enter') onClickSearchButton();
    }



    useEffect(() => {

    }, [counter, books])


    return (
        <div>
            <div style={{ display: 'flex', maxWidth: '600px', height: '80px', margin: 'auto', marginTop: '50px' }}>
                <Input ref={searchInput} id="myInput" value={searchData} onKeyDown={(e) => onKeyDown(e)} onChange={(e) => setSearchData(e.target.value)} />
                <Button variant={'default'} onClick={() => onClickSearchButton()}>Найти</Button>
            </div>
            <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '20px' }}>
                {count != 0 ?
                    <>
                        <div>Всего {count} Книг</div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="art">Art</SelectItem>
                                <SelectItem value="biography">Biography</SelectItem>
                                <SelectItem value="computers">Computers</SelectItem>
                                <SelectItem value="history">History</SelectItem>
                                <SelectItem value="medical">Medical</SelectItem>
                                <SelectItem value="poetry">Poetry</SelectItem>
                            </SelectContent>
                        </Select>
                    </>
                    :
                    null
                }
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {!isLoading ?
                    <>
                        {books && books.map((book, index) => {
                            return (
                                <BookCard key={index} book={book} />
                            )
                        })}
                    </>
                    :
                    <>
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                        <Skeleton className="h-[350px] w-[250px] rounded-xl" />
                    </>
                }
            </div>
            <div style={{ margin: 'auto', width: '100px', marginTop: '50px' }}>
                {isLoading ?
                    <ButtonLoading />
                    :
                    <Button disabled={counter == 0 ? true : false} onClick={() => onClickLoadMoreButton()}>
                        Load more
                    </Button>}
            </div>
        </div>

    );
};

export default SearchPage;