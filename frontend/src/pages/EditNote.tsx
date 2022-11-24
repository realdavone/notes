import { useLocation, useNavigate } from "react-router-dom"
import { Note } from "./Home"
import { Form, PartialNote } from "../components/Form"
import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { useLocalStorage } from "../hooks/useLocalStorage"

import BaseFetchResponse from "../types/main"
import { Title } from "../components/Title"

export const EditNote = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
  const storedNote: Note = useLocation()?.['state']
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleNote = (note: PartialNote) => {
    if(user === null){
      setNotes(notes.map(savedNote => {
        if(savedNote._id !== note!._id) return savedNote
        return { ...savedNote, ...note }
      }))
      navigate(-1)
    } else {
      fetch(`${import.meta.env['VITE_API_BASE_URL']}notes/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...note, id: note!._id })
      })
      .then(res => res.json())
      .then((data: Omit<BaseFetchResponse<unknown>, 'data'>) => {
        if(data.success) navigate(-1)
      })
    }
  }

  return (
    <div>
      <Title title={'Upraviť poznámku'}/>
      <Form note={storedNote} handleNote={handleNote} />
    </div>
  )
}
