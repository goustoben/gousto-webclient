import { getAuthToken } from '@library/auth'

import { RequestMiddleware } from '../types'
import { setHeader } from './header'

export const auth: RequestMiddleware<void> = setHeader(
  'Authorization',
  () => `Bearer ${getAuthToken()}`,
)
