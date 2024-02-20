import { useAppDispath, useAppSelector } from '@/hooks/redux';
import { fetchCurrentBook } from '@/store/reducers/ActionCreators';
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SeparatePage = () => {
    const { id } = useParams()
    const dispatch = useAppDispath()
    const { title, image, categories, description, authors, isLoading} = useAppSelector(state => state.currentBooksSlicer)


    useEffect(() => {
        dispatch(fetchCurrentBook(id!))
    }, [])

    return (
        <div className="flex">
            <div className="">
                <img src={image} />
            </div>
            { !isLoading ? 
            <div className="w-[600px] flex flex-col gap-3">
                <Badge>{categories} </Badge>
                {/* <Label htmlFor="framework"> {categories} </Label> */}
                <Label htmlFor="title"> {title} </Label>
                <Badge variant="outline">{authors} </Badge>
                {/* <Textarea className='h-fulll' disabled={true} placeholder={description}/> */}
                <Card>
                    <CardContent>
                        {description}
                    </CardContent>
                </Card>
            </div>
            :
            <Skeleton>

            </Skeleton>
            }
        </div>
    );
};

export default SeparatePage;