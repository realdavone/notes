import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import { AuthContext } from "../context/auth"
import { useFetch } from "../hooks/useFetch"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { categories, Note as NoteType } from "./Home"
import getRelativeTime from '../utils/relative-time'

const NoteWrapper = ({ note, onDelete }: {
  note: NoteType
  onDelete: () => void
}) => {
  return (
    <div className={`note ${note.isImportant && 'imp'}`}>
      <header>
        {categories[note.category].label && <div>{categories[note.category].label}</div>}
        <div className="controls">
          <Link to={'edit'} state={note}>
            <button>
              <span className="material-icons-outlined">edit_note</span>
            </button>
          </Link>
          <button onClick={() => onDelete()}>
            <span className="material-icons-outlined">delete</span>
          </button>
        </div>
      </header>
      <div className="date">
        <span className="material-icons-outlined">schedule</span>
        {getRelativeTime(note.timestamp)}
      </div>
      <h1>{note.title}</h1>
      <div className="content">{note.content}</div>
    </div>
  )
}

const OnlineNote = ({ noteId } : { noteId: string }) => {
  const navigate = useNavigate()
  const { loading, data: note, error } = useFetch<NoteType>(`notes/find/${noteId}`)

  const deleteOnlineNote = (): void => {
    fetch(`${import.meta.env['VITE_API_BASE_URL']}notes/remove`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: note?._id })
    })
    .then(res => res.json())
    .then((data: { success: boolean, message: string }) => {
      if(data.success) navigate(-1)
    })
  }

  if(loading) return <Loader />

  if(error) return <span>{error}</span>

  if(!note) return <></>

  return (
    <div className="note-outter">
      <NoteWrapper note={note} onDelete={deleteOnlineNote} />
    </div>
  )
}

const LocalNote = ({ noteId } : { noteId: string }) => {
  const navigate = useNavigate()
  const [notes, setNotes] = useLocalStorage<NoteType[]>('notes', [])

  const note = notes.find(note => note._id === noteId)

  const deleteLocalNote = (): void => {
    setNotes(notes.filter(note => note._id !== noteId))
    navigate(-1)
  }

  if(!note) return <div className="not-found">Poznámka neexistuje</div>

  return (
    <div className="note-outter">
      <NoteWrapper note={note} onDelete={deleteLocalNote}/>
    </div>
  )
}

export const Note = () => {
  const location = useLocation()
  const { user } = useContext(AuthContext)

  return (
    <>
      {user === null 
      ? 
      <LocalNote noteId={location.pathname.split('/')[2]} />
      : 
      <OnlineNote noteId={location.pathname.split('/')[2]} />}
    </>
  )
}
