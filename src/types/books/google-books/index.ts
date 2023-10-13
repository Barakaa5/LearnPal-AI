export type GoogleBookType = {
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  printType: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  infoLink: string;
  ISBN_13: string;
};
