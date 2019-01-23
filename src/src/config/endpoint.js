function endpoint(service, version = '') {
  let protocol
  let domain

  if (service === 'webclient') {
    protocol = __CLIENT_PROTOCOL__
    domain = `${__ENV__}-${service}.${__DOMAIN__}`
    if (__SERVER__) {
      protocol = 'http'
    } else if (__ENV__ === 'production') {
      domain = `www.${__DOMAIN__}`
    }
  } else {
    if (__ENV__ !== 'local') {
      if (__SERVER__) {
        protocol = 'http'
        domain = `${__ENV__}-${service}`
        domain += `.${__DOMAIN__}`
      } else {
        protocol = __CLIENT_PROTOCOL__
        domain = `${__ENV__}-api.${__DOMAIN__}`
        if (service !== 'core') {
          domain += `/${service}`
        }
        if (version) {
          domain += `/${version}`
        }
      }
    } else {
      protocol = 'http'

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
