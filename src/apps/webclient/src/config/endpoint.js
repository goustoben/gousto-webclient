import { isServer } from 'utils/serverEnvironment'

function endpoint(service, version = 1, { isCallFromServer = isServer(), apiEnvironmentToPointTo = __API_ENV__, appInstanceEnvironment = __RUNNING_ENV__ } = {}) {
  if(service === undefined) throw new Error("Please specify a valid service.")
  if(apiEnvironmentToPointTo === undefined) throw new Error("Please specify which environment to point this call to.")
  if(appInstanceEnvironment === undefined) throw new Error("Please specify whether this app is hosted 'locally' or 'live' on AWS.")

  const clientOrServerSide = isCallFromServer ? 'serverSide' : 'clientSide'

  const {
    [apiEnvironmentToPointTo]: {
      services: {
        [service]: serviceVersions
      }
    }
  } = __ENDPOINTS__

  let checkedVersion = serviceVersions[version] ? version : 1

  const {
    [checkedVersion]: {
      [clientOrServerSide]: {
        [appInstanceEnvironment]: endpoint
      }
    }
  } = serviceVersions

  return endpoint
}

export default endpoint
