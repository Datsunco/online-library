export interface IBook {
    id: number,
    volumeInfo: {
        categories: string[],
        title: string,
        authors: string
        imageLinks: {
            thumbnail: string | null
        }
    }
}
