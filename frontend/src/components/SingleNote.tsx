import { useNavigate } from 'react-router-dom'
import { Note } from '../pages/Home'
import { categories } from '../pages/Home'

export const SingleNote = ({ note }: { note: Note }) => {
  const navigate = useNavigate()

  return (
    <article>
      <div className="top-row">
        <span className={`${categories[note?.category].class} category`}>{categories[note?.category].label}</span>
        <div className="timestamp">{new Date(parseInt(note.timestamp)).toLocaleString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric', hour:'numeric', minute: '2-digit' })}</div>
      </div>
      <div className="title">
        <h3 title={note.title}>{note.title}</h3>
        {note.isImportant && <div className="important"><span className="material-icons">priority_high</span></div>}
      </div>
      <div className='content'>{note.content}</div>
      <button onClick={() => navigate(`/note/${note._id}`)}>Otvoriť</button>
    </article>
  )
}