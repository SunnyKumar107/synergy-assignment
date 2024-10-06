import { useContext, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import usersService from '../services/users'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { usersContext } from '@/context/context'

const UserForm = () => {
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { users, setUsers } = useContext(usersContext)

  const createUser = async (e: any) => {
    e.preventDefault()

    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      phone: e.target.phone.value,
      website: e.target.website.value,
      address: {
        street: e.target.address.value.split(' ')[0],
        city: e.target.address.value.split(' ')[1],
        zipcode: e.target.address.value.split(' ')[2]
      },
      company: {
        name: e.target.company.value
      }
    }

    setPending(true)
    try {
      const createdUser = await usersService.createNewUser(newUser)
      users && setUsers([createdUser, ...users])
    } catch (error) {
      setErrorMessage('Failed to create user')
    }
    setPending(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='lg' className='bg-emerald-600'>
          Create new
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Fill every field & create new user.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <p className='text-sm text-red-600'>
            <CircleAlert className='mr-1 inline h-4 w-4' /> {errorMessage}
          </p>
        )}
        <form onSubmit={createUser} className='flex flex-col gap-4'>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            required
          />
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='Email Address'
            required
          />
          <Input
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            required
          />

          <Input
            type='text'
            id='phone'
            name='phone'
            placeholder='Enter your phone number'
            required
          />
          <Input
            type='text'
            id='company'
            name='company'
            placeholder='Company Name'
            required
          />
          <div className='flex items-center space-x-4'>
            <Label htmlFor='address'>Website</Label>
            <Input
              type='text'
              id='website'
              name='website'
              placeholder='https://example.com'
              required
            />
          </div>
          <div className='flex items-center space-x-4'>
            <Label htmlFor='address'>Address</Label>
            <Input
              type='text'
              id='address'
              name='address'
              placeholder='Street, City & Zip Code'
              required
            />
          </div>
          <Button type='submit' disabled={pending} className='uppercase'>
            {pending ? (
              <>
                <LoaderCircle className='mb-0.5 mr-2 h-4 w-4 animate-spin' />
                Creating
              </>
            ) : (
              'Create'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
