import type { Application, Reservation } from '../types'

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export const getFavorites = () => read<string[]>('sonora:favorites', [])
export const saveFavorites = (items: string[]) => localStorage.setItem('sonora:favorites', JSON.stringify(items))
export const getReservations = () => read<Reservation[]>('sonora:reservations', [])
export const saveReservations = (items: Reservation[]) => localStorage.setItem('sonora:reservations', JSON.stringify(items))
export const getApplications = () => read<Application[]>('sonora:applications', [])
export const saveApplications = (items: Application[]) => localStorage.setItem('sonora:applications', JSON.stringify(items))
