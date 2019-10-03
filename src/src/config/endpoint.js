const getProtocol = (service, isServerSide, environment) => {
  if (isServerSide) {
    return 'http'
  }

  if (service === 'webclient' || environment !== 'local') {
    return 'https'
  }

  return 'http'
}

function endpoint(service, version = '') {
  const protocol = getProtocol(service, __SERVER__, __ENV__)
  let domain

  if (service === 'webclient') {
    domain = `${__ENV__}-${service}.${__DOMAIN__}`
    if (__SERVER__) {
    } else if (__ENV__ === 'production') {
      domain = `www.${__DOMAIN__}`
    }
  } else {
    if (__ENV__ !== 'local') {
      if (__SERVER__) {
        domain = `${__ENV__}-${service}`
        domain += `.${__DOMAIN__}`
      } else {
        domain = `${__ENV__}-api.${__DOMAIN__}`
        if (service !== 'core') {
          domain += `/${service}`
        }
        if (version) {
          domain += `/${version}`
        }
      }
    } else {
      if (service === 'core') {
        if (__CLIENT__) {
          domain = `api.${__DOMAIN__}`
        } else {
          domain = `api.${__DOMAIN__}:80`
        }
      } else {
        if (__CLIENT__) {
          domain = `api.${__DOMAIN__}/${service}/${version}`
        } else {
          domain = `api.${__DOMAIN__}:80/${service}/${version}`
        }
      }
    }
  }

  const url = `${protocol}://${domain}`

  return url
}

export default endpoint
