import { FormEvent, useState, useRef } from 'react'
import BaseFetchResponse from '../types/main'
import AuthLoader from './AuthLoader'

export const RegisterForm = ({ callback }: { callback: () => void } ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const repeatedPassword = useRef<HTMLInputElement | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(repeatedPassword.current!.value !== password){
      return setError('Heslá sa nezhodujú')
    }

    setLoading(true)
    setError(null)

    fetch(`${import.meta.env['VITE_API_BASE_URL']}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then((data: Omit<BaseFetchResponse<unknown>, 'data'>) => {
      if(!data.success) throw(data.message)
      callback()
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input type="email" autoComplete='off' required placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" autoComplete='off' required placeholder='Heslo' onChange={(e) => setPassword(e.target.value)} />
      <input type="password" autoComplete='off' required placeholder='Zopakovat heslo' ref={repeatedPassword} />
      {error && <span className='error'>{error && error}</span>}
      <button disabled={loading}>
        Registrovať
        {loading && <AuthLoader />}
      </button>
    </form>
  )
}
