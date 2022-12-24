import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.js'

dotenv.config()

export const login =  async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) return res.status(400).json({ success: false, message: 'Chýba meno alebo heslo' })

  const foundUser = await User.findOne({ email })

  if(foundUser === null) return res.status(400).json({ success: false, message: 'Užívateľ s týmto emailom neexistuje' })

  if(!bcrypt.compareSync(password, foundUser.password)) return res.status(400).json({ success: false, message: 'Nesprávne heslo' })

  const { password: userPassword, __v, ...rest } = foundUser._doc

  const token = jwt.sign({ id: foundUser.id, email }, process.env.JWT_KEY, { expiresIn: '24h' })

  res.cookie('access-token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json({ success: true, user: rest })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) return res.status(400).json({ success: false, message: 'Chýba meno alebo heslo' })

  if(await User.findOne({ email }) !== null) return res.status(400).json({ success: false, message: 'Užívateľ s týmto emailom už existuje' })

  const hashedPassword = await bcrypt.hash(password, 10)

  User.create({ email, password: hashedPassword })

  res.status(200).json({ success: true, message: 'Užívateľ bol vytvorený' })
}

export const logout = (req, res) => {
  res.clearCookie('access-token', { sameSite: 'none', secure: true, httpOnly: true }).status(200).json({ success: true, message: 'Úspešné odhlásenie' })
}