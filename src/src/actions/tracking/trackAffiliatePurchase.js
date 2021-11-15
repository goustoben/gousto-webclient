import globals from "config/globals"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { logLevels } from "actions/log/logLevels"

export const trackAffiliatePurchase = ({orderId, total, commissionGroup, promoCode}) =>
    async (dispatch) => {
        if (!(globals.client && window.AWIN)) {
            await dispatch(
                feLoggingLogEvent(
                    logLevels.error,
                    'trackAffiliatePurchase: Awin not in execution context',
                    {orderId, total, commissionGroup, promoCode}
                )
            )

            return
        }

        if (!orderId) {
            await dispatch(
                feLoggingLogEvent(
                    logLevels.error,
                    'trackAffiliatePurchase: missing orderId',
                    {orderId, total, commissionGroup, promoCode}
                )
            )

            return
        }

        const sale = {
            amount: total,
            channel: '',
            orderRef: orderId,
            parts: `${commissionGroup}:${total}`,
            voucher: promoCode,
            currency: 'GBP',
            test: globals.env === 'production' ? '0' : '1',
        }

        // Example #2 from
        // https://wiki.awin.com/index.php/Advertiser_Tracking_Guide/Standard_Implementation#Conversion_Tag
        window.AWIN.Tracking.Sale = sale

        await dispatch(
            feLoggingLogEvent(logLevels.info, 'trackAffiliatePurchase: sending awin request', {sale})
        )

        window.AWIN.Tracking.run()
    }
