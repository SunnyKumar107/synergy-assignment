import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import UserPage from './components/user'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
