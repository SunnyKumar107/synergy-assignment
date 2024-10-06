import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import UserDetails from './components/user-detail'
import { usersContext } from './context/context'
import { User } from './lib/definitions'
import { useEffect, useState } from 'react'
import usersService from './services/users'

function App() {
  const [users, setUsers] = useState<User[] | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersService.getUsers()
      setUsers(users)
    }

    fetchUsers()
  }, [])

  return (
    <>
      <usersContext.Provider value={{ users, setUsers }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users/:id' element={<UserDetails />} />
        </Routes>
      </usersContext.Provider>
    </>
  )
}

export default App
