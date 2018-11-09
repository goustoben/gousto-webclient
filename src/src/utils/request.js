/**
 * Is Facebook user agent
 * @param agent
 * @returns {boolean}
 */
export function isFacebookUserAgent(agent) {
  const lowerCaseAgent = agent.toLowerCase()

  return (
    lowerCaseAgent.includes('facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)') ||
		lowerCaseAgent.includes('facebookexternalhit/1.1') ||
		lowerCaseAgent.includes('facebot')
  )
}

