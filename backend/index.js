import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import notesRoutes from './router/notes.js'
import authRoutes from './router/auth.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))

app.use('/api/notes', notesRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.DB_ADDRESS, () => console.log('DB connected'))

app.listen(process.env.PORT || 8000, () => console.log(`Listening now.`))