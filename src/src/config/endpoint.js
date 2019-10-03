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

function endpoint(service, version = '') {
  const protocol = getProtocol(service, __SERVER__, __ENV__)
  const path = getPath(service, __SERVER__, __ENV__, version)
  const port = getPort(service, __ENV__, __CLIENT__)
  let domain

  if (service === 'webclient') {
    domain = `${__ENV__}-${service}.${__DOMAIN__}`
    if (!__SERVER__ && __ENV__ === 'production') {
      domain = `www.${__DOMAIN__}`
    }
  } else {
    if (__ENV__ !== 'local') {
      if (__SERVER__) {
        domain = `${__ENV__}-${service}`
        domain += `.${__DOMAIN__}`
      } else {
        domain = `${__ENV__}-api.${__DOMAIN__}`
      }
    } else {
      domain = `api.${__DOMAIN__}`
    }
  }

  const url = `${protocol}://${domain}${port}${path}`

  return url
}

export default endpoint
