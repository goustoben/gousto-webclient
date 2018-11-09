import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Svg from 'Svg'
import css from './ReasonsScreen.css'
import { Cancel } from 'containers/SubscriptionPause/callsToAction'

const SubscriptionPauseReasonsScreen = ({ onReasonChoice, reasons, type }) => (
	<div className={css.container}>
		<div className={type !== 'reasonList' ? css.gridView : css.listView}>
			{reasons && reasons.map((reason, index) => (
				<div
				  key={index}
				  onClick={() => onReasonChoice(reason.get('id'))}
				  className={type !== 'reasonList' ? css.gridItem : css.listItem}
				>
					{type === 'reasonGrid' ? <Svg fileName={`icon-reason-${reason.get('slug')}-hover`} className={css.svgHover} /> : null}
					{type === 'reasonGrid' ? <Svg fileName={`icon-reason-${reason.get('slug')}`}className={css.svg} /> : null}
					<span className={css.label}>{reason.get('label')}</span>
				</div>
			)).toArray()}
		</div>

		<div className={css.button}>
			<Cancel />
		</div>
	</div>
)

SubscriptionPauseReasonsScreen.propTypes = {
  onReasonChoice: React.PropTypes.func,
  reasons: React.PropTypes.instanceOf(Immutable.Map),
  type: React.PropTypes.oneOf(['reasonGrid', 'reasonList']),
}

SubscriptionPauseReasonsScreen.defaultProps = {
  onReasonChoice: () => {},
  reasons: Immutable.Map({}),
  type: 'reasonList',
}

export default SubscriptionPauseReasonsScreen
