import { actionTypes } from "actions/actionTypes"
import { experimentBucketedUser } from "actions/trackingKeys"

export function trackBucketedUser({experimentName, withinExperiment, bucket}) {
    return {
        type: actionTypes.EXPERIMENTS_TRACK_USER_BUCKETING,
        trackingData: {
            actionType: experimentBucketedUser,
            experimentName,
            withinExperiment,
            bucket
        }
    }
}
