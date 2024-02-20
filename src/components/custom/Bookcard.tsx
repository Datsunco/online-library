import { IBook } from '@/models/Book';
import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription} from "../ui/card"
import { Badge } from '../ui/badge';

interface BookItemProps {
    book: IBook,
    onClick?: React.MouseEventHandler<HTMLElement>
}

const BookCard: FC<BookItemProps> = ({ book, onClick}) => {

    // useEffect(() => {
    //     console.log(book)
    // })

    return (
            <Card className="w-[250px]" onClick={onClick}>
                <CardHeader>
                    <div style={{minHeight:'150px'}}>
                    <img className="max-w-[100px] max-h-[150px]" src={ book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : 'http://books.google.com/books/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'}/>
                    </div>
                    <Badge className="w-[150px] h-[20px] overflow-hidden" style={{overflow: 'hidden'}}> {book.volumeInfo.categories?.[0]}</Badge>
                    <CardTitle className="text-xl">{book.volumeInfo.title}</CardTitle>
                    <CardDescription className="max-h-[60px] overflow-hidden" style={{height: '200px', overflow: 'hidden'}}>{book.volumeInfo.authors}</CardDescription>
                </CardHeader>
            </Card>
    );
};

export default BookCard;