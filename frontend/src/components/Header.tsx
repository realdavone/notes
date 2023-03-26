import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import { ThemeContext } from "../context/theme"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import AuthLoader from "./AuthLoader"
import './Header.scss'

export default function Nav() {
  const { user, logout } = useContext(AuthContext)
  const { darkTheme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleLogout = async () => {
    setLogoutLoading(true)

    try {
      await logout(() => navigate('/'))
    }
    catch (error) { console.log(error) }
    finally { setLogoutLoading(false) }
  }

  return (
    <header className="main-header">
      <div className="row">
        <Link to={'/'} className='logo logo-holder'>
          <img src={Logo} alt="Logo" height="30" />
          MYNOTES
        </Link>
      </div>
      <div className="row">
        <div className="buttons">
          <NavLink tabIndex={0} to={'/note/new'} title='Nová poznámka'>
            <span className="material-icons">create</span>
            <span>Napísať poznámku</span>
          </NavLink>
          <button tabIndex={0} className="theme" onClick={() => toggleTheme()} title={`${darkTheme ? 'Tmavý' : 'Svetlý'} režim`}>
            <span className="material-icons-outlined">{darkTheme ? 'dark_mode' : 'light_mode'}</span>
            <span>{darkTheme ? 'Tmavý' : 'Svetlý'} režim</span>
          </button>        
        </div>
      </div>
      <div className="row">
        {user === null
        ?
        <button className="login" onClick={() => navigate('/auth')}>Prihlásiť</button>
        :
        <>
        <button className="login" onClick={handleLogout} disabled={logoutLoading}>
          {logoutLoading ? <span className="mob-hide">'Odhlasovanie'</span> : 'Odhlásiť'}
          {logoutLoading && <AuthLoader />}
        </button>
        <div className="user-info">
          <span className="material-icons-outlined">account_circle</span>
          <span className="email">{user.email}</span>
        </div>
        </>}
        <p className="banner">
          Je zapnutá {user === null ? 'offline' : 'online'} verzia mynotes.
          Poznámky sa ukladajú {user === null ? 'lokálne' : 'na server'}.
          Pre prístup k {user !== null ? 'offline' : 'online'} verzií je nutné sa {user === null ? 'prihlásiť' : 'odhlásiť'}.
        </p>
      </div>
    </header>
  )
}
