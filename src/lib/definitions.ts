export type User = {
  email: string
  id: number
  phone: string
  name: string
  username: string
  website: string
  company: { name: string }
  address: { street: string; city: string; zipcode: string }
}
