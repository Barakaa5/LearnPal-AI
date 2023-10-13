import axios from 'axios';

export const fetchBooksFromGooleBooks = async (query: string) => {
  const apiKey = 'AIzaSyBZ3MUOxr_YKN-4DAsoyGj_Aba8yv38NfM';
  const langRestrict = 'en';
  const apiEndpoint = `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${langRestrict}&maxResults=6&orderBy=relevance&key=${apiKey}`;
  try {
    const response = await axios(apiEndpoint);

    const books = response.data.items.map((item: any) => {
      const parsedBooks = excludeFieldsFromGoogleBooksResponse(item);
      const { volumeInfo } = parsedBooks;
      return { ...volumeInfo };
    });

    return books;
  } catch (error) {
    console.error(error);
  }
};

const excludeFieldsFromGoogleBooksResponse = (bookJSON: any) => {
  const fieldsToExclude = [
    'kind',
    'id',
    'etag',
    'selfLink',
    'volumeInfo.maturityRating',
    'volumeInfo.allowAnonLogging',
    'volumeInfo.contentVersion',
    'volumeInfo.canonicalVolumeLink',
    'volumeInfo.previewLink',
    // "volumeInfo.imageLinks",
    // "volumeInfo.infoLink",
    'volumeInfo.panelizationSummary',
    'volumeInfo.readingModes',
    'volumeInfo.averageRating',
    'volumeInfo.ratingsCount',
    'volumeInfo.language', // maybe we need it too?
    'volumeInfo.categories', // maybe we need it too?
    'saleInfo',
    'accessInfo',
    'searchInfo',
  ];

  // Iterate over the fields in the response object and check if each field is a field that we want to exclude.
  // If it is, remove the field from the object.
  for (const field of fieldsToExclude) {
    const keys = field.split('.');
    // eslint-disable-next-line no-prototype-builtins
    if (bookJSON.hasOwnProperty(keys[0])) {
      deleteNestedField(bookJSON, keys);
    }
  }

  if (bookJSON.volumeInfo) {
    bookJSON.volumeInfo.authors = formatAuthors(bookJSON.volumeInfo.authors);

    const formattedIdentifiers = formatIndustryIdentifiers(
      bookJSON.volumeInfo.industryIdentifiers
    );
    if (Object.keys(formattedIdentifiers).length > 0) {
      if (formattedIdentifiers.ISBN_13) {
        bookJSON.volumeInfo.ISBN_13 = formattedIdentifiers.ISBN_13;
      } else if (formattedIdentifiers.ISBN_10) {
        bookJSON.volumeInfo.ISBN_10 = formattedIdentifiers.ISBN_10;
      }
    }
    delete bookJSON.volumeInfo.industryIdentifiers; // remove the old industryIdentifiers field
  }
  return bookJSON;
};

const deleteNestedField = (obj: any, keys: string[]) => {
  if (keys.length === 1) {
    // If there's only one key left, delete it from the object.
    delete obj[keys[0]];
  } else {
    // Otherwise, navigate deeper into the object.
    const key = keys.shift();
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      deleteNestedField(obj[key], keys);
    }
  }
};

const formatAuthors = (authors: string[]) => {
  if (!authors) {
    return '';
  }
  if (authors.length === 1) {
    return authors[0];
  }
  return authors.join(' & ');
};
const formatIndustryIdentifiers = (
  industryIdentifiers: [{ type: string; identifier: string }]
) => {
  if (!industryIdentifiers) {
    return {};
  }

  for (const identifierObj of industryIdentifiers) {
    if (identifierObj.type === 'ISBN_13') {
      return { ISBN_13: identifierObj.identifier };
    }
  }
  for (const identifierObj of industryIdentifiers) {
    if (identifierObj.type === 'ISBN_10') {
      return { ISBN_10: identifierObj.identifier };
    }
  }
  return {};
};
