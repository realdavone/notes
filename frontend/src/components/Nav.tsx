import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { ThemeContext } from "../context/theme"
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Nav() {
  const { user, logout } = useContext(AuthContext)
  const { darkTheme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <nav className="container">
      <div className="left">
        <Link to={'/'} style={{ fontWeight: '700', fontSize: '1.5rem' }}>
          <img src="favicon.svg" alt="Icon" width={'40px'} />
          myNotes
        </Link>
      </div>
      <div className="right">
        <button onClick={() => toggleTheme()}>
          <span className="material-icons">{darkTheme ? 'dark_mode' : 'light_mode'}</span>
        </button>
        <button onClick={() => { return (user === null ? navigate('/auth') : logout()) }}>
          <span className="material-icons-outlined">{user === null ? 'login' : 'logout'}</span>
        </button>
        <Link tabIndex={0} to={'/note/new'}>
          <span className="material-icons">create</span>
        </Link>
      </div>

    </nav>
  )
}
