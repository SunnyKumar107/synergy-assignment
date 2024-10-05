import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import usersService from '../services/users'

const UserForm = () => {
  const [pending, setPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const createUser = async (e: any) => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value
    const username = e.target.username.value
    const phone = e.target.phone.value
    const website = e.target.website.value
    const street = e.target.address.value.split(' ')[0]
    const city = e.target.address.value.split(' ')[1]
    const company = e.target.company.value

    console.log(name, email, username, phone, website, company, street, city)

    setPending(true)
    try {
      await usersService.createNewUser({
        name,
        email,
        username,
        phone,
        website,
        address: {
          street,
          city
        },
        company: {
          name: company
        }
      })
    } catch (error: any) {
      console.log(error)
      setErrorMessage(error.message)
    }
    setPending(false)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-primary-foreground py-2'>
      <div className='mx-3 w-full max-w-lg rounded-md bg-background px-8 py-12 shadow-sm md:p-16 shaddow-md border'>
        <h1 className='text-center text-3xl font-bold'>Create User</h1>
        <p className='mt-2 text-center text-foreground/60'>
          Fill every field & create new user.
        </p>
        {errorMessage && (
          <p className='text-sm text-red-600'>
            <CircleAlert className='mr-1 inline h-4 w-4' /> {errorMessage}
          </p>
        )}
        <form onSubmit={createUser} className='mt-8 flex flex-col gap-6'>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='John Doe'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='username'>Username</Label>
            <Input
              type='text'
              id='username'
              name='username'
              placeholder='johndoe'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='john@example.com'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              type='text'
              id='phone'
              name='phone'
              placeholder='+21-4568-624'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='address'>Address</Label>
            <Input
              type='text'
              id='address'
              name='address'
              placeholder='Street & City'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='company'>Company Name</Label>
            <Input
              type='text'
              id='company'
              name='company'
              placeholder='Synergy Labs'
              required
            />
          </div>
          <div className='flex flex-col items-start gap-3'>
            <Label htmlFor='website'>Website</Label>
            <Input
              type='text'
              id='website'
              name='website'
              placeholder='https://example.com'
              required
            />
          </div>
          <Button
            type='submit'
            size='lg'
            disabled={pending}
            className='uppercase'
          >
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
      </div>
    </div>
  )
}

export default UserForm
