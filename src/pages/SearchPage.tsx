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
import { useNavigate, useParams } from "react-router-dom";
import { IBook } from "@/models/Book";

const SearchPage = () => {
    const { text, categor } = useParams()
    const navigate = useNavigate()
    const searchInput = useRef(null)

    const [counter, setCounter] = useState(0)
    const [category, setCategory] = useState<string>(categor || 'all')
    const [searchData, setSearchData] = useState<string>(text || '')

    const dispatch = useAppDispath()
    const { books, isLoading, count } = useAppSelector(state => state.bookSlicer)

    const onClickSearchButton = () => {
        if (searchData) {
            navigate(`/search/${searchData}/${category}`)
            dispatch(
                fetchAllBooks({
                    search: searchData,
                    count: 1,
                    category: category
                })
            )

            setCounter(1)
        }
    }

    const onClickLoadMoreButton = () => {
        if (count > counter * 30) {
            dispatch(
                fetchMoreBooks({
                    search: searchData,
                    count: counter + 1,
                    category: category
                })
            )
            setCounter(counter + 1)
        }
    }

    const onKeyDown = (e: any) => {
        if (e.key == 'Enter') onClickSearchButton();
    }

    const onCategoryChange = (category: string) => {
        setCategory(category)
        if (searchData)
            dispatch(
                fetchAllBooks({
                    search: searchData,
                    count: 1,
                    category: category
                })
            )
        navigate(`/search/${searchData}/${category}`)
    }

    const onClickBookCard = (book: IBook) => {
        navigate(`/book/${book.id}`)
    }

    useEffect(() => {
        if (categor)
            setCategory(categor)
    }, [])


    return (
        <div className="mt-[50px]">
            <div className="flex max-w-[600px] h-[80px] mt-[50px]" style={{ margin: 'auto'}}>
                <Input ref={searchInput} id="myInput" value={searchData} onKeyDown={(e) => onKeyDown(e)} onChange={(e) => setSearchData(e.target.value)} />
                <Button variant={'default'} onClick={() => onClickSearchButton()}>Найти</Button>
            </div>

            <div className="flex mb-[20px] justify-center gap-[15px]" >
                <Select value={category} onValueChange={(e) => onCategoryChange(e)}>
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
                <Select onValueChange={(e) => onCategoryChange(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                </Select>
                {count != 0 ?
                    <>
                        <div>Всего {count} Книг</div>

                    </>
                    :
                    null
                }
            </div>
            <div className="flex gap-[10px] justify-center flex-wrap">
                {!isLoading ?
                    <>
                        {books && books.map((book, index) => {
                            return (
                                <BookCard key={index} book={book} onClick={() => onClickBookCard(book)} />
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
            <div className="w-[100px] mt-[50px]" style={{ margin: 'auto'}}>
                {isLoading ?
                    <ButtonLoading />
                    :
                    <Button disabled={( books && books.length == 0) || (count < counter * 30) ? true : false} onClick={() => onClickLoadMoreButton()}>
                        Load more
                    </Button>}
            </div>
        </div>

    );
};

export default SearchPage;