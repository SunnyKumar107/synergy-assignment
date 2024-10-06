import UserForm from './create-user-form'

const Header = () => {
  return (
    <header className='border-b border-gray-200 bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 sm:text-3xl'>
              User Table
            </h1>

            <p className='mt-1.5 text-sm text-gray-500'>
              User table with CRUD operations
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <UserForm />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
