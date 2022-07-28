export type SnowplowWithCallback = <A extends any[]>(
  callback: (this: TrackerDictionary, ...args: A) => void,
  ...args: A
) => void

export type SnowplowWithTracker = (trackerName: string, ...args: any[]) => void

export type BrowserTracker = {
  getDomainUserId: () => string
}

export type TrackerDictionary = {
  // Corresponds to 'cf' defined in the Snowplow tag in GTM.
  // https://tagmanager.google.com/#/container/accounts/13119862/containers/669372/workspaces/1000271/tags
  cf: BrowserTracker
}
