import React from 'react'
import { Route } from 'react-router'
import { Login, Logout } from './Auth'

const login = (
	<Route path="/login" component={Login} />
)
const logout = (
	<Route path="/logout" component={Logout} />
)

export { login, logout }

