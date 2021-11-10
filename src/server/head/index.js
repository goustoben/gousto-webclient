import { gtm } from './gtm'
import { trustpilot } from './trustpilot'
import { defaultMeta } from './defaultMeta'
import { fbTracking } from './fbTracking'
import { pingdom } from './pingdom'
import { favicon } from './favicon'
import { mobileMeta } from './mobileMeta'
import { optimizely } from './optimizely'
import { ribbon } from './ribbon'

const head = {
  gtm,
  trustpilot,
  defaultMeta,
  fbTracking,
  pingdom,
  favicon,
  mobileMeta,
  optimizely,
  ribbon
}

/* eslint-disable-next-line import/no-default-export */
export default head
