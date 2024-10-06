import { User } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserRow = ({
  user,
  index,
  deleteUser
}: {
  user: User
  index: number
  deleteUser: (id: number) => void
}) => {
  const [pending, setPending] = useState(false)

  const deleteUserById = async (id: number) => {
    setPending(true)
    await deleteUser(id)
    setPending(false)
  }

  return (
    <tr
      className={cn('bg-gray-600', {
        'bg-emerald-500': index % 2 === 0
      })}
    >
      <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-white'>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td className='whitespace-nowrap text-center px-4 py-2 text-gray-100'>
        <Link to={`/users/${user.id}`}>{user.email}</Link>
      </td>
      <td className='whitespace-nowrap text-center px-4 py-2 text-gray-100'>
        <Link to={`/users/${user.id}`}>{user.company.name}</Link>
      </td>
      <td className='whitespace-nowrap text-center px-4 py-2'>
        <button className='text-white' onClick={() => deleteUserById(user.id)}>
          {pending ? <LoaderCircle className='animate-spin' /> : <Trash2 />}
        </button>
      </td>
    </tr>
  )
}

export default UserRow
