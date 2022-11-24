import express from 'express'

import { getNotes, getNote, postNote, editNote, removeNote } from '../controllers/notes.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, getNotes)
router.get('/find/:id', auth, getNote)
router.post('/new', auth, postNote)
router.put('/edit', auth, editNote)
router.delete('/remove', auth, removeNote)

export default router