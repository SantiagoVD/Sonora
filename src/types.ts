export interface Concert {
  id: string
  name: string
  genre: string
  venue: string
  date: string
  time: string
  price: number
  description: string
  artists: string[]
  image: string
  featured?: boolean
  demo?: boolean
}

export interface Artist {
  id: string
  name: string
  genre: string
  description: string
  bio: string
  image: string
  color: string
  instagram?: string
}

export interface Reservation {
  id: string
  concertId: string
  concertName: string
  attendee: string
  email: string
  quantity: number
  total: number
  createdAt: string
}

export interface Application {
  id: string
  artistName: string
  contactName: string
  email: string
  genre: string
  city: string
  portfolio: string
  description: string
  createdAt: string
}
