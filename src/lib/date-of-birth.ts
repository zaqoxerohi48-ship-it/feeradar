import { z } from 'zod'

const getDateString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const toISODate = (value: string) => {
  const [day, month, year] = value.split('/')

  return `${year}-${month}-${day}`
}

export const parseDateOfBirth = (value: string) => {
  const [day, month, year] = value.split('/').map(Number)

  return new Date(Date.UTC(year, month - 1, day))
}

export const dateOfBirthSchema = z
  .string()
  .min(1, {
    message: 'Date of birth is required'
  })
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'Invalid date'
  })
  .refine(
    (value) => {
      const date = parseDateOfBirth(value)

      return getDateString(date) === toISODate(value)
    },
    {
      message: 'Invalid date'
    }
  )
  .refine(
    (value) => {
      const today = new Date()

      const minBirthDate = getDateString(new Date(today.getFullYear() - 90, today.getMonth(), today.getDate()))

      return toISODate(value) >= minBirthDate
    },
    {
      message: 'You must be no older than 90 years'
    }
  )
  .refine(
    (value) => {
      const today = new Date()

      const maxBirthDate = getDateString(new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()))

      return toISODate(value) <= maxBirthDate
    },
    {
      message: 'You must be at least 13 years old'
    }
  )
