import Header from './components/Header'
import Home from './pages/Home'
import { NewNote } from './pages/NewNote'

import { Navigate, Route, Routes } from 'react-router-dom'
import { Note } from './pages/Note'
import { EditNote } from './pages/EditNote'
import { Auth } from './pages/Auth'
import { ReactElement, useContext } from 'react'
import { AuthContext } from './context/auth'

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

  return (
    <div className="App">
      <Header />
      <main className='container content'>
        <Routes>
          <Route path='/note'>
            <Route path='new' element={ <NewNote /> }/>
            <Route path=':id' element={ <Note /> }/>
            <Route path=':id/edit' element={ <EditNote /> } />
          </Route>
          <Route path='auth' element={
            <GuardedRoute conditionToRedirect={user !== null} redirect={'/'}>
              <Auth /> 
            </GuardedRoute>
          }/>
          <Route path='/' element={ <Home /> }/>
        </Routes>        
      </main>
    </div>
  )
}

export default App
