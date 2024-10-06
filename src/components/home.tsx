import { useContext } from 'react'
import usersService from '../services/users'
import Header from './header'
import { User } from '@/lib/definitions'
import { usersContext } from '@/context/context'
import UserRow from './user'
import { LoaderCircle } from 'lucide-react'

const Home = () => {
  const { users, setUsers } = useContext(usersContext)

  const deleteUser = async (id: number) => {
    const res = await usersService.deleteUserById(id)
    users && setUsers(users.filter((user: User) => user.id !== id))
    return res
  }

  return (
    <div className='min-h-screen'>
      <Header />
      {!users ? (
        <div className='flex h-[400px] items-center justify-center text-emerald-600'>
          <LoaderCircle className=' animate-spin' size={40} />
        </div>
      ) : (
        <div className='overflow-x-auto md:p-1'>
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
