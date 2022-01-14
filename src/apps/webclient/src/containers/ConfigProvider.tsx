import React, { createContext, useContext, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'

function basicFetch<T>(url: string, config?: AxiosRequestConfig) {
  return axios.get<T>(url, { responseType: 'json', ...config })
}

type Maybe<T> = T | undefined

type Config = {
  MAX_VARIABLE: Maybe<string>
}

const ConfigContext = createContext<Config>({ MAX_VARIABLE: undefined })

export const ConfigProvider: React.FC = ({ children }) => {
  const { data, error } = useSWR<{ data: Config }>('/config', basicFetch)

  // How do we handle errors here?
  useEffect(() => {
    if (!data) {
      console.time('Config request duration')
    }

    if (data) {
      console.timeEnd('Config request duration')
    }
  }, [data])

  return <ConfigContext.Provider value={data?.data as Config}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
  const config = useContext(ConfigContext)

  return config
}
