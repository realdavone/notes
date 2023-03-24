import getPagination from '../middleware/pagination.js'
import { createNoteInDB, editNoteInDB, getNoteFromDB, getNotesFromDB, removeNoteFromDB } from '../features/note.js'

export const getNotes = async (req, res) => {
  const { page } = req.body

  try {
    const notes = await getNotesFromDB({ author: req.user.id })

    const { results, numberOfPages, totalResult } = getPagination({
      data: notes,
      currentPage: page ?? 1,
      perPage: 10
    })

    res.status(200).json({
      notes: results,
      numberOfPages,
      totalResult
    }) 
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getNote = async (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user

  try {
    const getNoteFromUser = getNoteFromDB(userId)
    const note = await getNoteFromUser({ _id: id })
    
    res.status(200).json(note)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const postNote = async (req, res) => {
  const { title, content, isImportant, category } = req.body
  try {
    await createNoteInDB({ title, content, category, isImportant, author: req.user.id })
    
    res.status(200).json({
      success: true,
      message: 'Poznámka bola vytvorená'
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const editNote = async (req, res) => {
  const { title, content, isImportant, category, id } = req.body
  const { id: userId } = req.user 

  try {
    const editNoteInDBWithOptions = editNoteInDB(id, userId)
    await editNoteInDBWithOptions({ title, content, isImportant, category })

    res.status(200).json({
      success: true,
      message: 'Poznámka bola upravená'
    })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const removeNote = async (req, res) => {
  const { id } = req.body
  const { id: userId } = req.user

  try {
    await removeNoteFromDB(id, userId)
    res.status(200).json({
      success: true,
      message: 'Poznámka bola zmazaná'
    })
  } catch (error) {
    res.sendStatus(500)
  }
}