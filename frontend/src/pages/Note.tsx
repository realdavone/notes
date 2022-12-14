import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import { AuthContext } from "../context/auth"
import { useFetch } from "../hooks/useFetch"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { categories, Note as NoteType } from "./Home"


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

  return (
    <div className="note">
      {loading 
      ? 
      <Loader /> 
      :
      <>
      <>
        {note ?
        <>
          {categories[note.category].label && <div>{categories[note.category].label}</div>}
          <header>
            {note.isImportant && <div className="important" title="Dôležité"><span className="material-icons">priority_high</span></div>}
            <div className="controls">
              <Link to={'edit'} state={note}>
                <button>
                  <span className="material-icons-outlined">edit_note</span>
                </button>
              </Link>
              <button onClick={() => deleteOnlineNote()}>
                <span className="material-icons-outlined">delete</span>
              </button>
            </div>
          </header>
          <div className="date">
            <span className="material-icons-outlined">schedule</span>
            {new Date(parseInt(note.timestamp)).toLocaleString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric', hour:'numeric', minute: '2-digit' })}
          </div>
          <h1>{note.title}</h1>
          <div className="content">{note.content}</div>
        </>
        :
        <div className="not-found">Poznámka neexistuje</div>
        }
        </>
        <>
        {error && <span>{error}</span>}
        </>
      </>
      }
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

  return (
    <div className="note">
      {note ?
      <>
        <span className={`${categories[note.category].class} category`}>{categories[note.category].label}</span>
        <header>
          {note.isImportant && <div className="important" title="Dôležité"><span className="material-icons">priority_high</span></div>}
          <div className="controls">
            <Link to={'edit'} state={note}>
              <button>
                <span className="material-icons-outlined">edit</span>
              </button>
            </Link>
            <button onClick={() => deleteLocalNote()}>
              <span className="material-icons-outlined">delete</span>
            </button>
          </div>
        </header>
        <div className="date">
          <span className="material-icons-outlined">schedule</span>
          {new Date(parseInt(note.timestamp)).toLocaleString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric', hour:'numeric', minute: '2-digit' })}
        </div>
        <h1>{note.title}</h1>
        <div className="content">{note.content}</div>
      </>
      :
      <div className="not-found">Poznámka neexistuje</div>
      }
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
