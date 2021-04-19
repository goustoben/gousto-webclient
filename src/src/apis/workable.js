import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchJobs() {
  return fetch(null, `${endpoint('workable')}/workable/jobs`, null, 'GET')
}
