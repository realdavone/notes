import { useEffect, useState } from "react"

export const useFetch = <T>(endpoint: string, options?: Object) => {
  const [data, setData] = useState<null | T>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const controller = new AbortController()
  const signal = controller.signal

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)

    const request = new Request(`${import.meta.env['VITE_API_BASE_URL']}${endpoint}`, options || {
      method: 'GET',
      credentials: 'include',
      signal
    })

    fetch(request)
      .then(async (res) => {
        if (res.ok) return res.json()
        else return await res.json().then(error => { throw new Error(error.message) })
      })
      .then((data: T)  => setData(data))
      .catch((error) => {
        setData(null)
        setError(error.message || 'Nastala chyba')
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      import.meta.env.PROD && controller.abort()
    }
  }, [endpoint])

  return { data, loading, error }
}