import { useContext } from "react"
import { Form } from "../components/Form"
import { AuthContext } from "../context/auth"
import { PartialNote } from "../components/Form"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { Note } from "./Home"

import BaseFetchResponse from "../types/main"
import { Title } from "../components/Title"

export const NewNote = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleNote = (note: PartialNote) => {
    if(user === null){
      setNotes([...notes, { ...note as Omit<Note, '_id' | 'timestamp'>, _id: self.crypto.randomUUID(), timestamp: Date.now().toString()}])
      navigate(-1)
    } else {
      fetch(`${import.meta.env['VITE_API_BASE_URL']}notes/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...note })
      })
      .then(res => res.json())
      .then((data: Omit<BaseFetchResponse<unknown>, 'data'>) => {
        if(data.success) navigate(-1)
      })
    }
  }

  return (
    <>
      <Title title={'Vytvoriť poznámku'}/>
      <Form handleNote={handleNote} />
    </>
  )
}

