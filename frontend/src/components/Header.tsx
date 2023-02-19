import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { ThemeContext } from "../context/theme"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'

export default function Nav() {
  const { user, logout } = useContext(AuthContext)
  const { darkTheme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <header>
      <div className="row logo-holder">
        <img src={Logo} alt="Logo" height="30" />
        <Link to={'/'} className='logo'>MYNOTES</Link>
      </div>
      <div className="row">
        <div className="buttons">
          <NavLink tabIndex={0} to={'/note/new'} title='Nová poznámka'>
            <span className="material-icons">create</span>
            <span>Napísať poznámku</span>
          </NavLink>
          <button className="theme" onClick={() => toggleTheme()} title={`${darkTheme ? 'Tmavý' : 'Svetlý'} režim`}>
            <span className="material-icons-outlined">{darkTheme ? 'dark_mode' : 'light_mode'}</span>
            <span>{darkTheme ? 'Tmavý' : 'Svetlý'} režim</span>
          </button>        
        </div>
      </div>
      <div className="row">
        <button className="login" onClick={() => { user === null ? navigate('/auth') : logout(() => navigate('/')) }}>
          {`${user === null ? 'Prihlásiť' : 'Odhlásiť'}`}
        </button>
        <p className="banner">
          Je zapnutá {user === null ? 'offline' : 'online'} verzia mynotes.
          Poznámky sa ukladajú {user === null ? 'lokálne' : 'na server'}.
          Pre prístup k {user !== null ? 'offline' : 'online'} verzií je nutné sa {user === null ? 'prihlásiť' : 'odhlásiť'}.
        </p>
      </div>
    </header>
  )
}
