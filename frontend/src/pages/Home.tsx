import { useContext, useMemo, useState } from "react"
import Loader from "../components/Loader"
import { SingleNote } from "../components/SingleNote"
import { AuthContext } from "../context/auth"
import { useFetch } from "../hooks/useFetch"
import { useLocalStorage } from "../hooks/useLocalStorage"

export type Note = {
  _id: string,
  timestamp: string
  title: string
  content: string
  isImportant: boolean
  category: '' | 'personal' | 'finance' | 'health'
}

type NoteFilter = Partial<Note>

export const categories: Record<Note['category'], { label: string, class: string }> = {
  '': { label: '', class: '' },
  personal: { label: 'Osobné', class: 'per' },
  finance: { label: 'Financie', class: 'fin' },
  health: { label: 'Zdravie', class: 'hel' }
}

const getFitleredNotes = (data: Note[], filter: NoteFilter): Note[] => {
  if(data === null) return []
  return data.filter((note) => {
    if(Object.keys(filter).length === 0) return note
    for(let key of Object.keys(filter)){
      if(filter[key as keyof NoteFilter] === null) continue
      if(filter[key as keyof NoteFilter] !== note[key as keyof NoteFilter]) return false
    }
    return note
  })
}

const LocalStorageNotes = ({ filter }: { filter: NoteFilter }) => {
  const [savedNotes] = useLocalStorage<Note[]>('notes', [])

  const filteredNotes = useMemo(() => {
    return getFitleredNotes(savedNotes, filter)
  }, [filter])

  return (
    <section className="notes">
      {filteredNotes.length === 0 
      ?
      <span>Nie sú uložené žiadne poznámky</span>
      :
      filteredNotes!.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)).map((note) => <SingleNote note={note} key={note._id}/>
      )}
    </section>
  )
}

const OnlineNotes = ({ filter }: { filter: NoteFilter }) => {
  const { loading, error, data } = useFetch<Note[]>('notes')

  const filteredNotes = useMemo(() => {
    return getFitleredNotes(data!, filter)
  }, [filter, data])
  
  return (
    <>
    {
      loading
      ?
      <Loader />
      :
      <>
      <section className="notes">
        { filteredNotes === null || filteredNotes?.length === 0 
        ?
        <span>Nenašli sa žiadne poznámky</span>
        :
        filteredNotes!.map((note) =>
          <SingleNote note={note} key={note._id}/>
        )}
      </section>
      { error && <span>error</span> }
      </>
    }
    </>
  )
}

export default function Home() {
  const { user } = useContext(AuthContext)
  const [filter, setFilter] = useState<NoteFilter>({})

  return (
    <>
      <section className="filter">
        <select name={'category'} onChange={(e) => {
          setFilter({...filter, [e.target.name]: (e.target.value || null)})
        }}>
          {Object.keys(categories).map((category) => <option value={category} key={category}>{categories[category as Note['category']].label || 'Všetky kategórie'}</option>)}</select>
        <div className="filter-item">
          <label htmlFor="important">Len dôležité</label>
          <input id="important" type="checkbox" name="isImportant" onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: (e.target.checked || null) })
          }} />
        </div>
      </section>
      {user === null
      ?
      <LocalStorageNotes filter={filter} />
      :
      <OnlineNotes filter={filter} />}
    </>
  )
}