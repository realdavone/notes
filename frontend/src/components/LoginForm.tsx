import React, { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import AuthLoader from './AuthLoader'

export const LoginForm = ({ callback }: { callback: () => void }) => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      callback()
    } 
    catch (error: any) { setError(error) }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input type="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
      <input type="password" required placeholder='Heslo' onChange={(e) => setPassword(e.target.value)} autoComplete='current-password'/>
      {error && <span className='error'>{error && error}</span>}
      <button disabled={loading}>
        Prihlásiť
        {loading && <AuthLoader />}
      </button>
    </form>
  )
}
