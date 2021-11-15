import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackRefundFAQClick = ({
                                        compensationAmount,
                                        articleName,
                                        isAutoAccept,
                                        isMultiComplaints,
                                    }) => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.ssrIngredientsOpenRefundArticle,
        seCategory: SE_CATEGORY_HELP,
        amount: compensationAmount,
        article_name: articleName,
        auto_accept: isAutoAccept,
        is_second_complaint: isMultiComplaints,
    }
})
