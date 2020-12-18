import { useEffect, useState } from 'react'

export const useFetch = ({
  url,
  needsAuthorization,
  headers,
  options,
  parameters,
  accessToken,
  trigger = {
    shouldRequest: true,
    setShouldRequest: () => { }
  }
}) => {
  const [fetchResponse, setFetchResponse] = useState()
  const [isFetchLoading, setFetchLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const { shouldRequest, setShouldRequest } = trigger

  useEffect(() => {
    const authorizedHeader = (needsAuthorization && accessToken) ? { Authorization: `Bearer ${accessToken}` } : {}

    if (needsAuthorization && !accessToken) {
      setFetchError(new Error('Authorization access token is not present'))

      return
    }

    if (url) {
      const urlToFetch = new URL(url)

      if (parameters) {
        urlToFetch.search = new URLSearchParams(parameters)
      }

      const fetchData = async () => {
        try {
          setFetchLoading(true)

          const res = await global.fetch(urlToFetch.toString(), {
            ...options,
            headers: {
              ...headers,
              ...authorizedHeader,
            },
          })

          const json = await res.json()

          setFetchResponse(json)
        } catch (error) {
          setFetchError(error)
        } finally {
          setShouldRequest(false)
          setFetchLoading(false)
        }
      }

      if (shouldRequest) {
        fetchData()
      }
    }
  }, [url, shouldRequest]) // eslint-disable-line react-hooks/exhaustive-deps

  return [isFetchLoading, fetchResponse, fetchError]
}
