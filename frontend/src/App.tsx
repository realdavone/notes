import Header from './components/Header'
import Home from './pages/Home'
import { NewNote } from './pages/NewNote'

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Note } from './pages/Note'
import { EditNote } from './pages/EditNote'
import { Auth } from './pages/Auth'
import { ReactElement, useContext } from 'react'
import { AuthContext } from './context/auth'
import Error from './components/Error'

export const GuardedRoute = ({ children, conditionToRedirect, redirect }:{
  children: ReactElement,
  conditionToRedirect: boolean,
  redirect: string
}) => {
  if(conditionToRedirect) return <Navigate to={ redirect } />
  return children
}

function App() {
  const { user } = useContext(AuthContext)
  const { pathname } = useLocation()

  return (
    <div className="App">
      <div className="root">
        {pathname !== '/auth' && <Header />}
        <main className='content'>
          <Routes>
            <Route path='/note'>
              <Route path='new' element={ <NewNote /> }/>
              <Route path=':id' element={ <Note /> } />
              <Route path=':id/edit' element={ <EditNote /> } />
            </Route>
            <Route path='auth' element={
              <GuardedRoute conditionToRedirect={user !== null} redirect={'/'}>
                <Auth /> 
              </GuardedRoute>
            }/>
            <Route path='/' element={ <Home /> }/>
            <Route path='/*' element={ <Error message='404 Táto stránka neexistuje' /> }/>
          </Routes>        
        </main>
      </div>
    </div>
  )
}

export default App
