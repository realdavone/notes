import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export function arePasswordsMatching(password, passwordFromDB) {
  return bcrypt.compareSync(password, passwordFromDB)
}

export async function getHashedPassword(password) {
  return await bcrypt.hash(password, 10)
}

export function getToken(data) {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_KEY)
}