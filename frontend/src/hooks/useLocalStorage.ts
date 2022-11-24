import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (arg: T) => void] => {

  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key) || ''
      return JSON.parse(savedValue)
    } catch (error) {
      return initialValue as T
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}