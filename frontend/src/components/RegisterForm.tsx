import { FormEvent, useState } from 'react'

export const RegisterForm = ({ callback }: { callback: () => void } ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    fetch(`${import.meta.env['VITE_API_BASE_URL']}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) throw(data.message)
      callback()
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input type="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" required placeholder='Heslo' onChange={(e) => setPassword(e.target.value)} />
      <span className='error' style={{ visibility: (error === null ? 'hidden' : 'initial') }}>{error && error}</span>
      {error && <span className='error'>{error && error}</span>}
      <button disabled={loading}>Registrovať</button>
    </form>
  )
}
