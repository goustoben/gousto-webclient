import React from 'react'
import { useAccountHook } from '../context'

export const PersonalDetails = () => {
  const { user } = useAccountHook()

  const render = () => {
    // Implement error state
    // if (error) {
    //   return (
    //     'fail to load user'
    //   )
    // }

    // Implement loading state
    if (!user) {
      return (
        'loading user'
      )
    }

    return (
      <section id="personal-details">
        <h3>Personal Details</h3>
        <div>
          <p>{user.name_first} {user.name_last}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {render()}
    </>
  )
}
