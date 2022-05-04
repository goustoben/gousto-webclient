export const invokeHotjarEvent = (name: string): void => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', name)
  }
}

export const identifyHotjarUser = ({
  userId,
  snowplowUserId,
}: {
  userId: string
  snowplowUserId: string
}): void => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('identify', userId, { snowplowUserId })
  }
}
