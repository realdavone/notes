import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const auth = (req, res, next) => {
  if(!req?.cookies['access-token']) return res.status(400).json({ success: false, message: 'Chýba token' })

  try {
    const decoded = jwt.verify(req?.cookies['access-token'], process.env.JWT_KEY)
    req.user = decoded
    return next()
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Neplatný token' })
  }
}