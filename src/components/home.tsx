import { useEffect, useState } from 'react'
import usersService from '../services/users'
import Header from './header'
import { Link } from 'react-router-dom'
import { User } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'

const Home = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersService.getUsers()
      setUsers(users)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <Header />
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
            {users.map((user, i) => (
              <tr
                key={i}
                className={cn('bg-gray-600', { 'bg-emerald-500': i % 2 === 0 })}
              >
                <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-white'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className='whitespace-nowrap text-center px-4 py-2 text-gray-100'>
                  {user.email}
                </td>
                <td className='whitespace-nowrap text-center px-4 py-2 text-gray-100'>
                  {user.company.name}
                </td>
                <td className='whitespace-nowrap text-center px-4 py-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='text-white'>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='max-w-[100px]'>
                      <Button variant='ghost' className='w-full'>
                        Delete
                      </Button>
                      <Button variant='ghost' className='w-full'>
                        Edit
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
