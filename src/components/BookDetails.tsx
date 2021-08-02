import React, {Fragment, ReactElement, useCallback} from 'react';

import {Book} from '../types/Book'
import LoadingSpinner from './shared/LoadingSpinner'
import {useBookApi, bookApi} from '../shared/BookApi'
import {Link, useHistory, useParams} from 'react-router-dom';
import {useStore} from '../Store';

export default function BookDetails(): ReactElement {
  const {dispatch} = useStore()
  const {isbn} = useParams<{isbn: string}>()
  const history = useHistory()
  const book = useBookApi<Book>('get', `books/${isbn}`)[0]

  const onGoToList = useCallback(() => {
    history.push('/books')
  }, [history])

  const onDelete = useCallback(() => {
    bookApi('delete', `books/${isbn}`, onGoToList)
  }, [isbn, onGoToList])

  const addToCart = useCallback((book: Book) => () => {
    dispatch({type: 'addToCart', book})
  }, [dispatch])

  if (!book) {return <LoadingSpinner name={`Buch ${isbn}`} />}

  const getRatings = (): number[] => {
    const ratingArray = []
    for (let i = 0; i < (book.rating || 0); i++) {ratingArray.push(i)}
    return ratingArray
  }

  return (
    <>
      <h2>Book Details</h2>
      <div>
        <h1>{book.title}</h1>
        <div className="ui divider"></div>
        <div className="ui grid">
          <div className="four wide column">
            <h4>Autoren</h4>
            {/* alternativ: `book.authors.join(', ')` */}
            {book.authors.map((author, index) =>
              <Fragment key={author}>
                {author}
                {index !== book.authors.length - 1 && ', '}
              </Fragment>
            )}
          </div>
          <div className="four wide column">
            <h4>ISBN</h4>
            ISBN {book.isbn}
          </div>
          <div className="four wide column">
            <h4>Erschienen</h4>
            <p>{book.published.toLocaleDateString()}</p>
          </div>
          <div className="four wide column">
            <h4>Rating</h4>
            {getRatings().map(key => {
              return <i key={key} className="yellow star icon"></i>
            })}
          </div>
        </div>
        <h4>Beschreibung</h4>
        <p>{book.description}</p>
        <div className="ui small images">
          {book.thumbnails && book.thumbnails.map(thumbnail =>
            <img key={thumbnail.title} alt={thumbnail.title} src={thumbnail.url} />
          )}
        </div>
      </div>
      <button onClick={onGoToList} className="ui button">Back</button>
      <button onClick={onDelete} className="ui red button">Delete</button>
      <button onClick={addToCart(book)} className="ui green button">Add To Cart</button>
      <Link to={`/books/edit/${book.isbn}`} className="ui yellow button">Edit</Link>
    </>
  )
}
