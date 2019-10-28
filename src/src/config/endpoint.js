const getProtocol = (service, isServerSide, environment) => {
  if (isServerSide) {
    return 'http'
  }

  if (service === 'webclient' || environment !== 'local') {
    return 'https'
  }

  return 'http'
}

const getPath = (service, isServerSide, environment, version) => {
  const isCore = service === 'core'

  if (service === 'webclient') {
    return ''
  }

  if (environment === 'local' && !isCore) {
    return `/${service}/${version}`
  }

  if (isServerSide) {
    return ''
  }

  let path = ''
  if (!isCore) {
    path += `/${service}`
  }
  if (version) {
    path += `/${version}`
  }

  return path
}

const getPort = (service, environment, isClientSide) => {
  if (service === 'webclient' || environment !== 'local' || isClientSide) {
    return ''
  }

  return ':80'
}

const getSubdomain = (service, isServerSide, environment) => {
  if (service === 'webclient') {
    if (!isServerSide && environment === 'production') {
      return 'www'
    }

    return `${environment}-${service}`
  }

  if (environment === 'local') {
    return 'api'
  }

  if (isServerSide) {
    return `${environment}-${service}`
  }

  return `${environment}-api`
}

function endpoint(service, version = '') {
  const protocol = getProtocol(service, __SERVER__, __ENV__)
  const subdomain = getSubdomain(service, __SERVER__, __ENV__)
  const path = getPath(service, __SERVER__, __ENV__, version)
  const port = getPort(service, __ENV__, __CLIENT__)

  return `${protocol}://${subdomain}.${__DOMAIN__}${port}${path}`
}

export default endpoint
