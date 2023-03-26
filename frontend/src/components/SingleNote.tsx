import { Link } from 'react-router-dom'
import { Note } from '../pages/Home'
import CategoryLabel from './CategoryLabel'
import Timestamp from './Timestamp'

export const SingleNote = ({ note }: { note: Note }) => {
  return (
    <Link to={`/note/${note._id}`} className={note.isImportant ? 'imp' : ''} tabIndex={0}>
      <div className="top-row">
        <CategoryLabel category={note?.category}/>
        <Timestamp timestamp={note.timestamp}/>
      </div>
      <div className="title">
        <h3 title={note.title}>{note.title}</h3>
      </div>
      <div className='content'>{note.content}</div>
    </Link>
  )
}