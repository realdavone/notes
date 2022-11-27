import { Note } from "../pages/Home"
import { categories } from "../pages/Home"
import { NoteFilter } from "../pages/Home"

export const Filter = ({ filter, setFilter }: { filter: NoteFilter, setFilter: (filter: NoteFilter) => void }) => {
  return (
    <section className="filter">
      <select name={'category'} onChange={(e) => {
        setFilter({ ...filter, [e.target.name]: (e.target.value || null) })
      }}>
        {Object.keys(categories).map((category) => <option value={category} key={category}>{categories[category as Note['category']].label || 'Všetky kategórie'}</option>)}</select>
      <div className="filter-item">
        <label htmlFor="important">Len dôležité</label>
        <input id="important" type="checkbox" name="isImportant" onChange={(e) => {
          setFilter({ ...filter, [e.target.name]: (e.target.checked || null) })
        }} />
      </div>
    </section>
  )
}
