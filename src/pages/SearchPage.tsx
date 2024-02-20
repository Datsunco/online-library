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
import { useEffect, useState, useRef} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { IBook } from "@/models/Book";
// import { bookSlicer } from "@/store/reducers/bookSlicer";

const SearchPage = () => {
    const { text, categor} = useParams()
    const navigate = useNavigate()
    const searchInput = useRef(null)
    
    const [counter, setCounter] = useState(0)
    const [category, setCategory] = useState<string>('all')
    const [searchData, setSearchData] = useState<string>(text || '')
    
    const dispatch = useAppDispath()
    // const {setSearch} = bookSlicer.actions
    const { books, isLoading, count, search} = useAppSelector(state => state.bookSlicer)

    const onClickSearchButton = () => {
        navigate(`/search/${searchData}/${category}`)
        console.log(`/search/${searchData}/${category}`)
        // dispatch(setSearch(searchData))
        dispatch(
            fetchAllBooks({
                search: searchData,
                count: 1,
                category: category
            })
        )
        
        setCounter(1)
    }

    const onClickLoadMoreButton = () => {
        dispatch(
            fetchMoreBooks({
                search: searchData,
                count: counter + 1,
                category: category
            })
        )
        setCounter(counter + 1)
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
        console.log('bavigate', `/book/${book.id}`)
    }

    useEffect(() => {
        console.log(text, categor)
        // setCategory(categor!)
        // setSearchData(text!)
    }, [counter, books, search])


    return (
        <div>
            <div style={{ display: 'flex', maxWidth: '600px', height: '80px', margin: 'auto', marginTop: '50px' }}>
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
            <div style={{ margin: 'auto', width: '100px', marginTop: '50px' }}>
                {isLoading ?
                    <ButtonLoading />
                    :
                    <Button disabled={search == '' ? true : false} onClick={() => onClickLoadMoreButton()}>
                        Load more
                    </Button>}
            </div>
        </div>

    );
};

export default SearchPage;