import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Note } from '../pages/Home'
import AuthLoader from "./AuthLoader"
import './Form.scss'

interface PropsInterace {
  note?: Note
  handleNote: (note: PartialNote) => Promise<void>
}

export type PartialNote = Partial<Note>

export const Form = ({ note, handleNote }: PropsInterace) => {
  const navigate = useNavigate()

  const [noteToSubmit, setNoteToSubmit] = useState<PartialNote>({
    _id: note?._id || undefined,
    title: note?.title || '',
    content: note?.content || '',
    isImportant: note?.isImportant || false,
    category: note?.category || ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await handleNote(noteToSubmit)
    }
    catch (error) { console.log(error) }
    finally { setLoading(false) }
  }

  return (
    <form className="note" onSubmit={(e) => handleSubmit(e)}>
      <input name='title' value={noteToSubmit.title} type="text" required placeholder="Titulok" onChange={(e) => 
        setNoteToSubmit({...noteToSubmit, [e.target.name]: e.target.value})
      }/>
      <textarea name='content' value={noteToSubmit.content} required placeholder="Obsah" onChange={(e) => 
        setNoteToSubmit({...noteToSubmit, [e.target.name]: e.target.value})
      }/>
      <select name='category' value={noteToSubmit.category} onChange={(e) =>
        setNoteToSubmit({...noteToSubmit, [e.target.name]: e.target.value})
      }>
        <option value="">Nezaradené</option>
        <option value="personal">Osobné</option>
        <option value="finance">Financie</option>
        <option value="health">Zdravie</option>
      </select>
      <div className='checkbox'>
        <label htmlFor="input">Dôležitá</label>
        <input name='isImportant' type="checkbox" defaultChecked={noteToSubmit.isImportant} onChange={(e) =>
          setNoteToSubmit({...noteToSubmit, [e.target.name]: e.target.checked})
        } />
      </div>
      <div className="buttons">
        <button disabled={loading} tabIndex={0} className="cancel" type='button' onClick={() => navigate(-1)}>Zrušiť</button>
        <button disabled={loading} tabIndex={0} className="submit" type='submit'>
          {loading ? 'Ukladám' : 'Uložiť'}
          {loading && <AuthLoader />}
        </button>
      </div>
    </form>
  )
}