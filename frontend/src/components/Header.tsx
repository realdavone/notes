import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { ThemeContext } from "../context/theme"
import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
  const { user, logout } = useContext(AuthContext)
  const { darkTheme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <header className="container">
      <div className="left">
        <Link to={'/'} style={{ fontWeight: '700', fontSize: '1.25rem' }}>myNotes</Link>
      </div>
      <div className="right">
        <Link tabIndex={0} to={'/note/new'} title='Nová poznámka'>
          <span className="material-icons">create</span>
        </Link>
        <button className="theme" onClick={() => toggleTheme()} title={`${darkTheme ? 'Tmavý' : 'Svetlý'} režim`}>
          <span className="material-icons-outlined">{darkTheme ? 'dark_mode' : 'light_mode'}</span>
        </button>
        <button onClick={() => { user === null ? navigate('/auth') : logout(() => navigate('/')) }}>
          {`${user === null ? 'Prihlásiť' : 'Odhlásiť'}`}
        </button>
      </div>
    </header>
  )
}
