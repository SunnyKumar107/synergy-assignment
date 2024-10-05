import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import UserPage from './components/user'
import UserForm from './components/create-user-form'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/create-new' element={<UserForm />} />
      </Routes>
    </>
  )
}

export default App
