import { User } from '@/lib/definitions'
import { createContext } from 'react'

export const usersContext = createContext<{
  users: User[] | null
  setUsers: any
}>({ users: null, setUsers: null })
