import { arePasswordsMatching, getHashedPassword, getToken } from '../features/auth.js'
import { createUser, getUser } from '../features/user.js'

export const login =  async (req, res) => {
  const { email, password } = req.body

  if(!email || !password)
    return res.status(400).json({
      success: false,
      message: 'Chýba meno alebo heslo'
    })

  const foundUser = await getUser({ email })

  if(!foundUser)
    return res.status(400).json({
      success: false,
      message: 'Užívateľ s týmto emailom neexistuje'
    })

  if(!arePasswordsMatching(password, foundUser.password))
    return res.status(400).json({
      success: false,
      message: 'Nesprávne heslo'
    })

  const { password: userPassword, __v, ...rest } = foundUser._doc

  const token = getToken({ id: foundUser.id, email })

  const maxAge = 7 * 24 * 60 * 60 * 1000

  res.cookie('access-token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge
  }).status(200).json({
    success: true,
    user: rest,
    expiresOn: new Date().getTime() + maxAge
  })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password)
    return res.status(400).json({
      success: false,
      message: 'Chýba meno alebo heslo'
    })

  if(await getUser({ email }))
    return res.status(400).json({
      success: false,
      message: 'Užívateľ s týmto emailom už existuje'
    })

  const hashedPassword = await getHashedPassword(password)

  await createUser({ email, password: hashedPassword })

  res.status(200).json({
    success: true,
    message: 'Užívateľ bol vytvorený'
  })
}

export const logout = (_, res) => {
  res.clearCookie('access-token', {
    sameSite: 'none',
    secure: true,
    httpOnly: true
  }).status(200).json({
    success: true,
    message: 'Úspešné odhlásenie'
  })
}