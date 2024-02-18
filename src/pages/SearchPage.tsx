import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/custom/Bookcard";
import { ButtonLoading } from "@/components/loadingButton";
import { useAppDispath, useAppSelector } from "@/hooks/redux";
import { fetchAllBooks, fetchMoreBooks} from "@/store/reducers/ActionCreators";
import { useEffect, useState } from "react";

const SearchPage = () => {
    const [searchData, setSearchData] = useState('')
    const [counter, setCounter] = useState(1)
    const dispatch = useAppDispath()
    const { books, isLoading} = useAppSelector(state => state.bookSlicer)

    const onClickSearchButton = () => {
        dispatch(fetchAllBooks({
            search: searchData,
            count: 1
        }))
    }

    const onClickLoadMoreButton = () => {
        dispatch(fetchMoreBooks({
            search: searchData,
            count: counter + 1
        }))
        setCounter(counter + 1)
    }

    useEffect(() => {
        console.log(counter, counter == 1)
    }, [counter, books])


    return (
        <div>
            <div style={{ display: 'flex', maxWidth: '600px', height: '80px', margin: 'auto', marginTop: '50px' }}>
                <Input onChange={(e) => setSearchData(e.target.value)} />
                <Button variant={'default'} onClick={() => onClickSearchButton()}>Найти</Button>
            </div>
            {/* {books.map(elem => <div>{elem.id}</div>)} */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {books && books.map((book, index) => {
                    return (
                        <BookCard key={index} book={book} />
                    )
                })
                }
            </div>
            <div style={{margin: 'auto', width:'100px'}}>
            {isLoading ?
                <ButtonLoading />
                :
                <Button disabled={counter == 1 ? true : false} onClick={() => onClickLoadMoreButton()}>
                    Load more
                </Button>}
            </div>
        </div>

    );
};

export default SearchPage;