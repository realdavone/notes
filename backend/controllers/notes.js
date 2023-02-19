import Note from '../models/note.js'
import getPagination from '../middleware/pagination.js'

export const getNotes = async (req, res) => {
  const { page } = req.body

  try {
    const notes = await Note.find({ author: req.user.id }).sort({ timestamp: 'descending' })

    const { results, numberOfPages, totalResult } = getPagination({
      data: notes,
      currentPage: page ?? 1,
      perPage: 10
    })

    res.status(200).json({ notes: results, numberOfPages, totalResult }) 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getNote = (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user 

  Note.findById(id).then((data, error) => {
    if(error) return res.status(500).json({ success: false, message: error.message })

    if(data._doc.author.toString() !== userId) return res.status(400).json({ success: false, message: 'Nemáte prístup k tejto poznámke' })

    res.status(200).json(data)
  }).catch((error) => {
    res.status(500).json({ success: false, message: error.message })
  })
}

export const postNote = async (req, res) => {
  const { title, content, isImportant, category } = req.body
  try {
    await Note.create({ title, content, category, isImportant, author: req.user.id })
    res.status(200).json({ success: true, message: 'Poznámka bola vytvorená' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const editNote = async (req, res) => {
  const { title, content, isImportant, category, id } = req.body
  const { id: userId } = req.user 

  Note.findById(id).then((data, error) => {
    if(error) return res.status(500).json({ success: false, message: error.message })
    if(data._doc.author.toString() !== userId) return res.status(400).json({ success: false, message: 'Môžete upraviť len svoje poznámky' })
    
    data.title = title
    data.content = content
    data.isImportant = isImportant
    data.category = category

    data.save()

    res.status(200).json({ success: true, message: 'Poznámka bola upravená' })
  }).catch((error) => {
    res.status(500).json({ success: false, message: error.message })
  })
}

export const removeNote = (req, res) => {
  const { id } = req.body
  const { id: userId } = req.user 

  Note.findById(id).then((data, error) => {
    if(error) return res.status(500).json({ success: false, message: error.message })
    if(data._doc.author.toString() !== userId) return res.status(400).json({ success: false, message: 'Môžete mazať len svoje poznámky' })
    data.remove()
    res.status(200).json({ success: true, message: 'Poznámka bola zmazaná' })
  }).catch((error) => {
    res.status(500).json({ success: false, message: error.message })
  })
}