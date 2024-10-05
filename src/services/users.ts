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

const deleteUserById = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const createNewUser = async (userData: any) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const updateUser = async (id: number, userData: any) => {
  const response = await axios.put(`${baseUrl}/${id}`, userData)
  return response.data
}

export default {
  getUsers,
  getUserById,
  deleteUserById,
  createNewUser,
  updateUser
}
