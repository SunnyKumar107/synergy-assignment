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
import { User } from '@/lib/definitions'
import { toast } from 'sonner'

const EditForm = ({ user }: { user: User }) => {
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { users, setUsers } = useContext(usersContext)

  const updateUser = async (e: any) => {
    e.preventDefault()

    const userForUpdate = {
      id: user.id,
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
    if (users === null) return

    setPending(true)
    try {
      if (user.id > 10) {
        setUsers(users.map((u: User) => (u.id === user.id ? userForUpdate : u)))
        setPending(false)
        toast('User updated successfully')

        return
      }
      const updatedUser = await usersService.updateUser(user.id, userForUpdate)

      setUsers(users.map((u: User) => (u.id === user.id ? updatedUser : u)))
      toast('User updated successfully')
    } catch (e) {
      console.log(e)
      toast('Failed to update user')
      setErrorMessage('Failed to update user')
    }
    setPending(false)
  }

  if (!user) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-[90px]' variant='outline'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[360px] md:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes in user details here.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <p className='text-sm text-red-600'>
            <CircleAlert className='mr-1 inline h-4 w-4' /> {errorMessage}
          </p>
        )}
        <form onSubmit={updateUser} className='flex flex-col gap-4'>
          <Input
            type='text'
            id='name'
            name='name'
            defaultValue={user.name}
            placeholder='Name'
            required
          />
          <Input
            type='email'
            id='email'
            name='email'
            defaultValue={user.email}
            placeholder='Email Address'
            required
          />
          <Input
            type='text'
            id='username'
            defaultValue={user.username}
            name='username'
            placeholder='Username'
            required
          />

          <Input
            type='text'
            id='phone'
            name='phone'
            defaultValue={user.phone}
            placeholder='Enter your phone number'
            required
          />
          <Input
            type='text'
            id='company'
            name='company'
            defaultValue={user.company.name}
            placeholder='Company Name'
            required
          />
          <div className='flex items-center space-x-4'>
            <Label htmlFor='address'>Website</Label>
            <Input
              type='text'
              id='website'
              name='website'
              defaultValue={user.website}
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
              defaultValue={
                user.address.street +
                ' ' +
                user.address.city +
                ' ' +
                user.address.zipcode
              }
              placeholder='Street, City & Zip Code'
              required
            />
          </div>
          <Button type='submit' disabled={pending} className='uppercase'>
            {pending ? (
              <>
                <LoaderCircle className='mb-0.5 mr-2 h-4 w-4 animate-spin' />
              </>
            ) : (
              'Update'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditForm
