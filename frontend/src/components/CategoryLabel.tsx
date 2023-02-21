import { Note, categories } from "../pages/Home"

interface CategoryLabelProps {
  category: Note['category']
}

export default function CategoryLabel({ category }: CategoryLabelProps) {
  return (
    <span className={`${categories[category].class} category`}>{categories[category].label}</span>
  )
}
