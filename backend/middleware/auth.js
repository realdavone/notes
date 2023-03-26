import { verifyToken } from '../services/auth.js'

export const auth = (req, res, next) => {
  if(!req?.cookies['access-token'])
    return res.status(400).json({
      success: false,
      message: 'Chýba token'
    })

  try {
    const decoded = verifyToken(req?.cookies['access-token'])
    req.user = decoded
    
    return next()
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Neplatný token' })
  }
}