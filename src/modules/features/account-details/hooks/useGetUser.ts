import useSWR from "swr"
import { useEffect } from "react"
import type { Dispatch } from '../context'
import { ActionTypes } from '../context/reducers'
import { User } from '../models/user'

type CoreResponse = {
  result: {
    data: {
      user: User,
    }
  }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useGetUser = (dispatch: Dispatch) => {
  const { data, error } = useSWR<CoreResponse, Error>('http://localhost:3030/app/user', fetcher, {
    shouldRetryOnError: false,
  })

  useEffect(() => {
    if (error) {
      // Implement dispatch error
      // return {
      //   data: null,
      //   error
      // }
    }

    if (data) {
      dispatch({ type: ActionTypes.USER_DATA_RECEIVED, payload: { data: data.result.data.user } })
    }
  }, [data, error])
}
