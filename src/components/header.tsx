import { Button } from './ui/button'

const Header = () => {
  return (
    <header className='border-b border-gray-200 bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              Blog Posts
            </h1>

            <p className='mt-1.5 text-sm text-gray-500'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure,
              recusandae.
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Button size='lg'>Create User</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
