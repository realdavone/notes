import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import './auth.scss'

type FormType = 'LOGIN' | 'REGISTER'

export const Auth = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>('LOGIN')
  const navigate = useNavigate()
  
  const callbackAfterFormSubmit = useCallback(() => navigate('/'), [])

  const forms: Record<FormType, ReactNode> = {
    'LOGIN': <LoginForm callback={ callbackAfterFormSubmit } />,
    'REGISTER': <RegisterForm callback={ callbackAfterFormSubmit } />
  }

  useEffect(() => { document.title = 'Autorizácia / mynotes' }, [])

  return (
    <section className="auth">
      {forms[selectedForm]}
      {
        selectedForm === 'LOGIN'
        ?
        <button className='switch-button' onClick={() => setSelectedForm('REGISTER')}>Ešte nemáte účet?</button>
        :
        <button className='switch-button' onClick={() => setSelectedForm('LOGIN')}>Už máte účet?</button>
      }
    </section>
  )
}
