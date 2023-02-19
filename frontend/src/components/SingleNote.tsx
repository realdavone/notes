import { Link, useNavigate } from 'react-router-dom'
import { Note } from '../pages/Home'
import { categories } from '../pages/Home'
import getRelativeTime from '../utils/relative-time'

export const SingleNote = ({ note }: { note: Note }) => {
  const navigate = useNavigate()

  return (
    <Link to={`/note/${note._id}`}>
      <div className="top-row">
        <span className={`${categories[note?.category].class} category`}>{categories[note?.category].label}</span>
        <div className="timestamp">{getRelativeTime(note.timestamp)}</div>
      </div>
      <div className="title">
        <h3 title={note.title}>{note.title}</h3>
        {note.isImportant && <div className="important"><span className="material-icons">priority_high</span></div>}
      </div>
      <div className='content'>{note.content}</div>
    </Link>
  )
}