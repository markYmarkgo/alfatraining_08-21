import React, {ReactElement, useCallback} from 'react';

import BookListItem from './BookListItem'
import {Book} from '../types/Book'
import LoadingSpinner from './shared/LoadingSpinner';
import {useBookApi, bookApi} from '../shared/BookApi'

export default function BookList(): ReactElement {

  const [books, setBooks] = useBookApi<Book[]>('get', 'books')

  const onReset = useCallback(() => {
    bookApi<string>('delete', 'books', () => {
      bookApi<Book[]>('get', 'books', setBooks)
    })
  }, [setBooks])

  if (!books) {return <LoadingSpinner name="Bücher" />}

  return books.length // !== 0
    ? (
      <>
        <h2>Book List</h2>
        <div className="ui middle aligned selection divided list">
          {books.map(book => <BookListItem book={book} key={book.isbn} />)}
        </div>
      </>
    )
    : (
      <div className="ui message">
        <div className="header">
          Keine Bücher vorhanden!
          {' '}
          <button className="ui button" onClick={onReset}>Zurücksetzen</button>
        </div>
      </div>
    )
}
