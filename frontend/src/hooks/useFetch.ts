import { useEffect, useState } from "react"

export const useFetch = <T>(endpoint: string, options?: Object) => {
  const [data, setData] = useState<null | T>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)

    const request = new Request(`${import.meta.env['VITE_API_BASE_URL']}${endpoint}`, options || {
      method: 'GET',
      credentials: 'include'
    })

    fetch(request)
    .then((res) => {
      if (res.ok) return res.json()
      throw "Nastala chyba"
    })
    .then((data: T)  => setData(data))
    .catch((error) => setError(error))
    .finally(() => setLoading(false))
  }, [endpoint])

  return { data, loading, error }
}