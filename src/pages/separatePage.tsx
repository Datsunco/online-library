import { useAppDispath, useAppSelector } from '@/hooks/redux';
import { fetchCurrentBook } from '@/store/reducers/ActionCreators';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SeparatePage = () => {
    const {title, image} = useAppSelector(state => state.currentBooksSlicer)
    const { id } = useParams()
    const dispatch = useAppDispath()

    useEffect(() => {
        dispatch(fetchCurrentBook(id!))
    }, [])

    return (
        <div>
            <img src={image}/>
            {title}
            {id}
        </div>
    );
};

export default SeparatePage;