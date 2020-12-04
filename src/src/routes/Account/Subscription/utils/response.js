export const isCoreRequestSuccessful = (response) =>
  Boolean(
    response
    && response.status
    && response.status === 'ok'
  )
