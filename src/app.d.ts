export type Book = {
  id: number,
  title: string,
  author: string,
  overview: string,
  image: string,
  reviews: Review[],
}

export type Review = {
  id: number,
  username: string,
  comment: string,
  like: number,
}
