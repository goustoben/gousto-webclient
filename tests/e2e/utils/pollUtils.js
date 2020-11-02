const DEFAULT_TIMEOUT_MS = 30000
const DEFAULT_RESCHEDULE_MS = 500

class Poller {
  constructor(conditions, callback, timeoutMs, rescheduleMs) {
    this.conditions = conditions
    this.callback = callback
    this.timeoutMs = timeoutMs
    this.rescheduleMs = rescheduleMs

    this.start()
  }

  start() {
    const startTimestamp = new Date().getTime()
    this.lastTimestamp = startTimestamp + this.timeoutMs
    this.checkConditions()
  }

  checkConditions() {
    this.index = 0
    this.currentCondition = this.conditions[this.index]
    this.checkOne()
  }

  checkOne() {
    const { checkFn } = this.currentCondition
    const onConditionDone = this.onConditionDone.bind(this)
    checkFn(onConditionDone)
  }

   onConditionDone(checkResult) {
    if (checkResult) {
      const { tag } = this.currentCondition
      this.callback('conditionMet', tag)
    } else if (this.index < this.conditions.length - 1) {
      ++this.index
      this.currentCondition = this.conditions[this.index]
      this.checkOne()
    } else {
      this.scheduleTimeout()
    }
  }

  scheduleTimeout() {
    const now = new Date().getTime()
    if (now > this.lastTimestamp) {
      this.callback('timeRanOut')
    } else {
      const checkConditions = this.checkConditions.bind(this)
      setTimeout(checkConditions, this.rescheduleMs)
    }
  }
}

/**
 * Poll until either (a) any one of conditions is met, or (b) time runs out.
 *
 * A Condition's checkFn is an asynchrounous function that invokes its callback
 * with either true or false, because this utility is expected to work with
 * nightwatch's async APIs (e.g. http://v09.nightwatchjs.org/api#element).
 *
 * @param conditions: Condition[]
 *
 * type CheckFnType = (callback: (result: boolean) => void) => void
 *
 * type Condition = {
 *   tag: string,
 *   checkFn: CheckFnType
 * }
 *
 * @param callback: (pollResult: 'conditionMet' | 'timeRanOut', passedTag?: string) => void
 * @param timeoutMs?: number: how long to poll before giving up
 * @param rescheduleMs?: number - how long to wait between polling checks
 */
function pollRace(conditions, callback, timeoutMs = DEFAULT_TIMEOUT_MS, rescheduleMs = DEFAULT_RESCHEDULE_MS) {
  new Poller(conditions, callback, timeoutMs, rescheduleMs)
}


/**
 * Poll until either (a) checkFn returns true, or (b) time runs out.
 *
 * checkFn is asynchrounous, see `pollRace`.
 *
 * @param checkFn: CheckFnType
 *
 * @param callback: (pollResult: 'conditionMet' | 'timeRanOut') => void
 * @param timeoutMs?: number
 * @param rescheduleMs?: number
 */
function pollCondition(checkFn, callback, timeoutMs = DEFAULT_TIMEOUT_MS, rescheduleMs = DEFAULT_RESCHEDULE_MS) {
  const conditions = [
    { tag: '', checkFn }
  ]
  // Swallow the passedTag argument as it's not relevant to the
  // single-condition situation.
  const pollerCallback = (pollResult) => {
    callback(pollResult)
  }
  new Poller(conditions, pollerCallback, timeoutMs, rescheduleMs)
}

module.exports = {
  pollRace,
  pollCondition
}
