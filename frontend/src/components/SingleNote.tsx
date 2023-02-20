import { Link } from 'react-router-dom'
import { Note } from '../pages/Home'
import { categories } from '../pages/Home'
import getRelativeTime from '../utils/relative-time'

export const SingleNote = ({ note }: { note: Note }) => {
  return (
    <Link to={`/note/${note._id}`} className={note.isImportant ? 'imp' : ''}>
      <div className="top-row">
        <span className={`${categories[note?.category].class} category`}>{categories[note?.category].label}</span>
        <div className="timestamp">{getRelativeTime(note.timestamp)}</div>
      </div>
      <div className="title">
        <h3 title={note.title}>{note.title}</h3>
      </div>
      <div className='content'>{note.content}</div>
    </Link>
  )
}