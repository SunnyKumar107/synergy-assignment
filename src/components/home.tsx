import { useContext } from 'react'
import usersService from '../services/users'
import Header from './header'
import { User } from '@/lib/definitions'
import { usersContext } from '@/context/context'
import UserRow from './user'

const Home = () => {
  const { users, setUsers } = useContext(usersContext)

  const deleteUser = async (id: number) => {
    const res = await usersService.deleteUserById(id)
    users && setUsers(users.filter((user: User) => user.id !== id))
    return res
  }

  return (
    <div>
      <Header />
      {!users ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='bg-background py-6 px-4 rounded-2xl shaddow-md border'>
            <h1 className='text-6xl font-bold text-gray-700'>Loading...</h1>
          </div>
        </div>
      ) : (
        <div className='overflow-x-auto px-2 py-1'>
          <table className='min-w-full bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr className='bg-gray-600'>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                  Name
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                  Email
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                  Company
                </th>
                <th className='px-4 py-2'></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: User, i: number) => (
                <UserRow
                  key={i}
                  user={user}
                  index={i}
                  deleteUser={deleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Home
