import { ReactNode, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'

type FormType = 'LOGIN' | 'REGISTER'

export const Auth = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>('LOGIN')
  const navigate = useNavigate()
  
  const callbackAfterFormSubmit = useCallback(() => navigate('/'), [])

  const forms: Record<FormType, ReactNode> = {
    'LOGIN': <LoginForm callback={ callbackAfterFormSubmit } />,
    'REGISTER': <RegisterForm callback={ callbackAfterFormSubmit } />
  }

  return (
    <section className="auth">
      <div className='buttons'>
        <button className={selectedForm === 'REGISTER' ? 'active' : ''} onClick={() => setSelectedForm('REGISTER')}>Registrácia</button>
        <button className={selectedForm === 'LOGIN' ? 'active' : ''} onClick={() => setSelectedForm('LOGIN')}>Prihlásenie</button>
      </div>
      {forms[selectedForm]}
    </section>
  )
}
