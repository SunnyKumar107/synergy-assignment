import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'
import { User } from '@/lib/definitions'
import { Button } from './ui/button'

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const id = useParams().id
  useEffect(() => {
    const fetchUser = async () => {
      const _user = await usersService.getUserById(Number(id))
      console.log('user', _user)
      setUser(_user)
    }
    fetchUser()
  }, [])

  return (
    <div className='flex h-screen items-center justify-center bg-primary-foreground'>
      <div className='bg-background py-6 px-4 rounded-2xl shaddow-md border'>
        <h1 className='text-6xl font-bold text-emerald-600'>{user?.name}</h1>
        <div className='mt-2 flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-semibold text-gray-500'>
              Email: <span className='text-gray-700'>{user?.email}</span>
            </p>
            <p className='text-sm font-semibold text-gray-500'>
              Username: <span className='text-gray-700'>{user?.username}</span>
            </p>
          </div>
          <h3 className='text-sm text-gray-500 font-semibold'>
            Phone:{' '}
            <span className='text-gray-700'>{user?.phone.split(' ')[0]}</span>
          </h3>
        </div>
        <div className='mt-2 font-bold text-gray-500'>
          <h2>
            Company:{' '}
            <span className='text-emerald-500'>{user?.company.name}</span>
          </h2>
          <h2>
            Address:{' '}
            <span className='text-gray-600'>{user?.address.city},</span>{' '}
            <span className='text-gray-600'>{user?.address.street},</span>{' '}
            <span className='text-emerald-500'>{user?.address.zipcode}</span>
          </h2>
        </div>
        <div className='mt-8 flex items-center justify-between'>
          <a
            className='text-sm font-medium text-blue-600 hover:text-blue-800'
            href={user?.website}
          >
            {user?.website}
          </a>
          <div className='flex items-center space-x-4'>
            <Button variant='outline'>Edit</Button>
            <Button variant='destructive'>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
