import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (id: number) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getUsers,
  getUserById
}
