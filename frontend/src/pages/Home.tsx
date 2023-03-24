import { useContext, useEffect, useMemo, useState } from "react"
import { Filter } from "../components/Filter"
import Loader from "../components/Loader"
import NoResults from "../components/NoResults"
import Error from "../components/Error"
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

export type NoteFilter = Partial<Note>

export const categories: Record<Note['category'], {
  label: string,
  class: string
}> = {
  '': { label: '', class: '' },
  personal: { label: 'Osobné', class: 'per' },
  finance: { label: 'Financie', class: 'fin' },
  health: { label: 'Zdravie', class: 'hel' }
}

const getFitleredNotes = (data: Note[] | null, filter: NoteFilter): Note[] => {
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

const LocalStorageNotes = ({
  filter
}:{
  filter: NoteFilter
}) => {
  const [savedNotes] = useLocalStorage<Note[]>('notes', [])

  const filteredNotes = useMemo(() => {
    return getFitleredNotes(savedNotes, filter)
  }, [filter])

  if(filteredNotes.length === 0) return <NoResults message="Nenašli sa žiadne poznámky" />

  return (
    <section className="notes">
      {filteredNotes!.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)).map((note) => 
        <SingleNote note={note} key={note._id}/>
      )}
    </section>
  )
}

const OnlineNotes = ({
  filter
}:{
  filter: NoteFilter
}) => {
  const { loading, error, data } = useFetch<{ notes: Note[], numberOfPages: number, totalResult: number }>('notes')

  const filteredNotes = useMemo(() => {
    if(data?.notes) return getFitleredNotes(data.notes, filter)
    else return []
  }, [filter, data?.notes])

  if(loading) return <Loader />

  if(error) return <Error message={error} />

  if(filteredNotes.length === 0) return <NoResults message="Nenašli sa žiadne poznámky" />
  
  return (
    <section className="notes">
      {filteredNotes!.map((note) =>
        <SingleNote note={note} key={note._id}/>
      )}
    </section>
  )
}

function Notes({
  filter
}:{
  filter: NoteFilter
}) {
  const { user } = useContext(AuthContext)

  useEffect(() => { document.title = 'Domov / mynotes' }, [])

  if(user) return <OnlineNotes filter={filter} />

  return <LocalStorageNotes filter={filter} />
}

export default function Home() {
  const [filter, setFilter] = useState<NoteFilter>({})

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <Notes filter={filter}/>
    </>
  )
}