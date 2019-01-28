function endpoint(service, version = '') {
  if (service === 'core') {
    return 'https://staging-api.gousto.info'
  }

  return `https://staging-api.gousto.info/${service}/${version}`
}

export default endpoint