import React, {useState, SyntheticEvent, useCallback, ChangeEvent, SetStateAction} from 'react';
import {useHistory} from 'react-router-dom'
import css from './BookForm.module.css'

import {bookApi} from '../shared/BookApi'
import {BookWithDateString} from '../types/Book'

interface Props extends BookWithDateString {
  isEdit: boolean
}

export default function BookForm(props: Props): JSX.Element {
  const buildThumbnail = (title: string, url: string) => ({title, url})

  const [title, setTitle] = useState(props.title)
  const [subtitle, setSubtitle] = useState(props.subtitle || '')
  const [isbn, setIsbn] = useState(props.isbn)
  const [description, setDescription] = useState(props.description || '')
  const [authors, setAuthors] = useState(props.authors)
  const [thumbnails, setThumbnails] = useState(props.thumbnails || [buildThumbnail('', '')])
  const [published, setPublished] = useState(props.published)

  const history = useHistory()

  const book = useCallback(
    () => ({title, subtitle, isbn, description, authors, thumbnails, published}),
    [title, subtitle, isbn, description, authors, thumbnails, published]
  )

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault() // stops default reloading behaviour
    bookApi(
      props.isEdit ? 'put' : 'post',
      props.isEdit ? `books/${props.isbn}` : 'books',
      () => history.push(props.isEdit ? `/books/${props.isbn}` : '/books'),
      book()
    )
  }, [book, history, props.isEdit, props.isbn])

  const onChangeAuthor = useCallback((index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setAuthors(_authors => {
      const copyAuthors = [..._authors]
      copyAuthors[index] = e.target.value
      return copyAuthors
    })
  }, [])

  const onChangeThumbnail = useCallback((index: number, key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnails(_thumbnails => {
      const copyThumbnails = [..._thumbnails]
      copyThumbnails[index] = {...copyThumbnails[index], [key]: e.target.value}
      return copyThumbnails
    })
  }, [])

  const onAddThumbnail = useCallback(() => {
    setThumbnails(_thumbnails => {
      return [..._thumbnails, buildThumbnail('', '')]
    })
  }, [])

  const onRemoveThumbnail = useCallback(() => {
    setThumbnails(_thumbnails => {
      const newThumbnails = [..._thumbnails]
      newThumbnails.pop()
      return newThumbnails
    })
  }, [])

  const onAddAuthor = useCallback(() => {
    setAuthors(_authors => [..._authors, ''])
  }, [])

  const onRemoveAuthor = useCallback(() => {
    setAuthors(_authors => {
      if (_authors.length > 1) {
        const newAuthors = [..._authors]
        newAuthors.pop()
        return newAuthors
      } else {
        return _authors
      }
    })
  }, [])

  const onChangeState = useCallback((setter: SetStateAction<any>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
  }, [])

  return (
    <form className={`ui form ${css.bookFom}`} onSubmit={handleSubmit}>
      <label>Buchtitel</label>
      <input placeholder="Titel" required value={title} onChange={onChangeState(setTitle)} />

      <label>Untertitel</label>
      <input placeholder="Subtitle" value={subtitle} onChange={onChangeState(setSubtitle)} />

      <label>Isbn</label>
      <input
        placeholder="Isbn"
        readOnly={props.isEdit}
        required
        pattern="\d{9}|\d{11}"
        title="Isbn Nummer muss zwischen 9 und 11 Zeichen lang sein"
        value={isbn}
        onChange={useCallback((e) => {setIsbn(e.target.value)}, [])} />

      <label>Erscheinungsdatum</label>
      <input type="date" required value={published} onChange={useCallback((e) => {setPublished(e.target.value)}, [])} />

      <label>Authoren</label>
      <button className="ui mini button" type="button" onClick={onAddAuthor}>+</button>
      <button className="ui mini button" type="button" onClick={onRemoveAuthor}>-</button>
      {authors.map((author, index) =>
        <div key={index} className="sixteen wide field">
          <input
            placeholder="Autor"
            required
            value={author}
            onChange={onChangeAuthor(index)} />
        </div>
      )}

      <label>Beschreibung</label>
      <input placeholder="Description" value={description} onChange={onChangeState(setDescription)} />

      <label>Bilder</label>
      <button className="ui mini button" type="button" onClick={onAddThumbnail}>+</button>
      <button className="ui mini button" type="button" onClick={onRemoveThumbnail}>-</button>
      {thumbnails.map((thumbnail, index) =>
        <div key={index} className="field">
          <input placeholder="Url" required className="nine wide field" value={thumbnail.url}
            onChange={onChangeThumbnail(index, 'url')} />
          <input placeholder="Titel" className="seven wide field" value={thumbnail.title}
            onChange={onChangeThumbnail(index, 'title')} />
        </div>
      )}
      <button className="ui button">Submit</button>
    </form >
  )
}
